import { FiniteField, SecretSharing } from '@gears-bot/crypto'
import { Storage } from '@plasmohq/storage'
import { secp256k1 } from '@noble/curves/secp256k1'
import { keccak_256 } from '@noble/hashes/sha3'
import { randomBytes } from '@noble/hashes/utils'
import { decode, encode } from 'bs58'

export class Vault {
  private local = new Storage({ area: 'local' })
  private session = new Storage({ area: 'session' })
  private LOCALSHARE: string
  private PASSWORD: string
  private ss = new SecretSharing(new FiniteField(secp256k1.CURVE.n, 'be'))

  constructor(public readonly id: string) {
    this.LOCALSHARE = `${id}/localshare`
    this.PASSWORD = `${id}/password`
  }

  private verify = (pwd: string, localshare: string) => {
    const [proof, share] = localshare.split('/')
    const local = decode(share)
    const mind = SecretSharing.compress({
      index: this.ss.ff.ONE.serialize(8),
      t: local.subarray(8, 16),
      n: local.subarray(16, 24),
      id: local.subarray(24, 32),
      secret: this.ss.ff.norm(keccak_256(pwd)).serialize(),
    })
    const privkey = this.ss.construct([mind, local])
    const pubkey = secp256k1.getPublicKey(privkey)
    if (encode(pubkey) !== proof) throw new Error('Invalid shares or proof')
    return { privkey, pubkey }
  }

  new = async (pwd: string) => {
    const mind = SecretSharing.compress({
      index: this.ss.ff.ONE.serialize(8),
      t: this.ss.ff.norm(2).serialize(8),
      n: this.ss.ff.norm(3).serialize(8),
      id: randomBytes(8),
      secret: this.ss.ff.norm(keccak_256(pwd)).serialize(),
    })
    const secret = SecretSharing.compress({
      index: this.ss.ff.ZERO.serialize(8),
      t: mind.subarray(8, 16),
      n: mind.subarray(16, 24),
      id: mind.subarray(24, 32),
      secret: this.ss.ff.rand().serialize(),
    })
    const local = SecretSharing.compress({
      index: this.ss.ff.norm(2).serialize(8),
      t: mind.subarray(8, 16),
      n: mind.subarray(16, 24),
      id: mind.subarray(24, 32),
      secret: this.ss
        .interpolate(this.ss.ff.norm(2).serialize(8), [secret, mind])
        .serialize(),
    })
    const cloud = SecretSharing.compress({
      index: this.ss.ff.norm(3).serialize(8),
      t: mind.subarray(8, 16),
      n: mind.subarray(16, 24),
      id: mind.subarray(24, 32),
      secret: this.ss
        .interpolate(this.ss.ff.norm(3).serialize(8), [secret, mind])
        .serialize(),
    })
    // Double check the shares
    const proof = secp256k1.getPublicKey(secret.subarray(32))
    const localshare = `${encode(proof)}/${encode(local)}`
    const { pubkey } = this.verify(pwd, localshare)
    return { localshare, cloudshare: encode(cloud), pubkey: encode(pubkey) }
  }

  isInitialized = async () => {
    try {
      const localshare = await this.local.get(this.LOCALSHARE)
      if (!localshare) throw new Error('Empty local share')
      const [proof] = localshare.split('/')
      return decode(proof)
    } catch {
      return undefined
    }
  }

  isUnlocked = async () => {
    const pwd = await this.session.get(this.PASSWORD)
    return !!pwd
  }

  set = async (pwd: string, localshare: string) => {
    const { pubkey } = this.verify(pwd, localshare)
    await this.session.set(this.PASSWORD, pwd)
    await this.local.set(this.LOCALSHARE, localshare)
    return encode(pubkey)
  }

  remove = async () => {
    await this.session.remove(this.PASSWORD)
    await this.local.remove(this.LOCALSHARE)
  }

  lock = async () => {
    await this.session.remove(this.PASSWORD)
  }

  unlock = async (pwd: string) => {
    const localshare = await this.local.get(this.LOCALSHARE)
    if (!localshare) throw new Error('Please config a wallet first')
    const { pubkey } = this.verify(pwd, localshare)
    await this.session.set(this.PASSWORD, pwd)
    return encode(pubkey)
  }
}
