import axios from 'axios'
import { FiniteField, SecretSharing, equal } from '@gears-bot/crypto'
import { Storage } from '@plasmohq/storage'
import { secp256k1 } from '@noble/curves/secp256k1'
import { keccak_256 } from '@noble/hashes/sha3'
import { randomBytes } from '@noble/hashes/utils'
import { decode, encode } from 'bs58'
import type { Session } from '@supabase/supabase-js'

export type ExtendedSecretShare = `${string}/${string}`

export class CloudStorage {
  public readonly url =
    'https://wkktjwtivwbkjnjyfwxb.supabase.co/functions/v1/secret-share'
  constructor(public readonly session: Session) {}

  get headers() {
    return {
      Authorization: `Bearer ${this.session.access_token}`,
    }
  }

  private buildCloudshare = (
    secretShare?: SecretShare,
  ): ExtendedSecretShare | undefined => {
    const { id, secret } = secretShare || {}
    if (!id || !secret) return undefined
    return `${id}/${secret}`
  }

  get = async () => {
    const {
      data: { data, error },
    } = await axios.get<EdgeResponse<SecretShare[]>>(this.url, {
      headers: this.headers,
    })
    if (error) throw new Error(error.message)
    const [secretShare] = data || []
    return this.buildCloudshare(secretShare)
  }

  post = async (cloudshare: ExtendedSecretShare) => {
    const [id, secret] = cloudshare.split('/')
    const {
      data: { data, error },
    } = await axios.post<EdgeResponse<SecretShare[]>>(
      this.url,
      { id, secret },
      { headers: this.headers },
    )
    if (error) throw new Error(error.message)
    const [secretShare] = data || []
    return this.buildCloudshare(secretShare)
  }

  patch = async (secret: string) => {
    const {
      data: { data, error },
    } = await axios.patch<EdgeResponse<SecretShare[]>>(
      this.url,
      { secret },
      { headers: this.headers },
    )
    if (error) throw new Error(error.message)
    const [secretShare] = data || []
    return this.buildCloudshare(secretShare)
  }

  delete = async () => {
    // TODO
  }
}

export class Vault extends CloudStorage {
  private localStorage = new Storage({ area: 'local' })
  private sessionStorage = new Storage({ area: 'session' })
  private LOCALSHARE: string
  private PASSWORD: string
  private ss = new SecretSharing(new FiniteField(secp256k1.CURVE.n, 'be'))

  constructor(session: Session) {
    super(session)
    this.LOCALSHARE = `${this.session.user.id}/localshare`
    this.PASSWORD = `${this.session.user.id}/password`
  }

  private hash = (str: string) => {
    return keccak_256(new TextEncoder().encode(str))
  }

  private verify = (pwd: string, shares: ExtendedSecretShare[]) => {
    const pubkeys = shares.map((s) => s.split('/')).map(([p]) => decode(p))
    if (!equal(...pubkeys)) throw new Error('Invalid shares or proof')
    const secrets = shares.map((s) => s.split('/')).map(([_, s]) => decode(s))
    const [pubkey] = pubkeys
    const [secret] = secrets
    const mind = SecretSharing.compress({
      index: this.ss.ff.ONE.serialize(8),
      t: secret.subarray(8, 16),
      n: secret.subarray(16, 24),
      id: secret.subarray(24, 32),
      secret: this.ss.ff.norm(this.hash(pwd)).serialize(),
    })
    const privkey = this.ss.construct([mind, ...secrets])
    const proof = secp256k1.getPublicKey(privkey)
    if (!equal(pubkey, proof)) throw new Error('Invalid shares or proof')
    return { privkey, pubkey }
  }

  new = (pwd: string, cloudshare?: ExtendedSecretShare) => {
    const [cloudpubkey, cloudsecret] = cloudshare?.split('/') || []
    const cloud = cloudsecret
      ? decode(cloudsecret)
      : SecretSharing.compress({
          index: this.ss.ff.norm(3).serialize(8),
          t: this.ss.ff.norm(2).serialize(8),
          n: this.ss.ff.norm(3).serialize(8),
          id: randomBytes(8),
          secret: this.ss.ff.rand().serialize(),
        })
    const mind = SecretSharing.compress({
      index: this.ss.ff.ONE.serialize(8),
      t: cloud.subarray(8, 16),
      n: cloud.subarray(16, 24),
      id: cloud.subarray(24, 32),
      secret: this.ss.ff.norm(this.hash(pwd)).serialize(),
    })
    const local = SecretSharing.compress({
      index: this.ss.ff.norm(2).serialize(8),
      t: cloud.subarray(8, 16),
      n: cloud.subarray(16, 24),
      id: cloud.subarray(24, 32),
      secret: this.ss
        .interpolate(this.ss.ff.norm(2).serialize(8), [mind, cloud])
        .serialize(),
    })
    const secret = this.ss.construct([mind, local, cloud])
    // Double check the shares
    const proof = cloudpubkey
      ? decode(cloudpubkey)
      : secp256k1.getPublicKey(secret)
    const _localshare: ExtendedSecretShare = `${encode(proof)}/${encode(local)}`
    const _cloudshare: ExtendedSecretShare = `${encode(proof)}/${encode(cloud)}`
    this.verify(pwd, [_localshare, _cloudshare])
    return { localshare: _localshare, cloudshare: _cloudshare }
  }

  isInitialized = async () => {
    try {
      const localshare = await this.localStorage.get(this.LOCALSHARE)
      if (!localshare) throw new Error('Empty local share')
      const [proof] = localshare.split('/')
      return decode(proof)
    } catch {
      return undefined
    }
  }

  isUnlocked = async () => {
    const initialized = await this.isInitialized()
    if (!initialized) return false
    const pwd = await this.sessionStorage.get(this.PASSWORD)
    return !!pwd
  }

  set = async (
    pwd: string,
    localshare: ExtendedSecretShare,
    { strict = true }: { strict?: boolean } = {},
  ) => {
    if (strict) {
      const exists = await this.localStorage.set(this.LOCALSHARE, localshare)
      if (exists)
        throw new Error(
          "Cannot overide the localshare. If you understand what you're doing, set the 'strict' flag to false to override the current local share.",
        )
    }
    const { pubkey } = this.verify(pwd, [localshare])
    await this.sessionStorage.set(this.PASSWORD, pwd)
    await this.localStorage.set(this.LOCALSHARE, localshare)
    return encode(pubkey)
  }

  remove = async () => {
    await this.sessionStorage.remove(this.PASSWORD)
    await this.localStorage.remove(this.LOCALSHARE)
  }

  lock = async () => {
    await this.sessionStorage.remove(this.PASSWORD)
  }

  unlock = async (pwd: string) => {
    const localshare = await this.localStorage.get<ExtendedSecretShare>(
      this.LOCALSHARE,
    )
    if (!localshare) throw new Error('Please config a wallet first')
    const { pubkey } = this.verify(pwd, [localshare])
    await this.sessionStorage.set(this.PASSWORD, pwd)
    return encode(pubkey)
  }
}
