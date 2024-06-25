import { Storage } from '@plasmohq/storage'
import { keccak_256 } from '@noble/hashes/sha3'
import { decode, encode } from 'bs58'
import { concatBytes, randomBytes } from '@noble/hashes/utils'

export class Password {
  private local = new Storage({
    area: 'local',
  })
  private session = new Storage({
    area: 'session',
  })
  private HASH: string
  private PASSWORD: string

  constructor(public readonly identidier: string) {
    this.HASH = `${identidier}/hash`
    this.PASSWORD = `${identidier}/password`
  }

  private hash = (pwd: string, salt = randomBytes(32)) => {
    const x = keccak_256(pwd)
    const y = keccak_256(concatBytes(salt, x))
    return encode(concatBytes(salt, y))
  }

  set = async (pwd?: string) => {
    if (!pwd) {
      await this.session.remove(this.PASSWORD)
      await this.local.remove(this.HASH)
    } else {
      await this.session.set(this.PASSWORD, pwd)
      await this.local.set(this.HASH, this.hash(pwd))
    }
  }

  isInitialized = async () => {
    const placeholder = await this.local.get(this.HASH)
    return !!placeholder
  }

  isUnlocked = async () => {
    const pwd = await this.session.get(this.PASSWORD)
    return !!pwd
  }

  unlock = async (pwd: string) => {
    const img = await this.local.get(this.HASH)
    if (!img) return false
    const salt = decode(img).subarray(0, 32)
    if (this.hash(pwd, salt) !== img) return false
    await this.session.set(this.PASSWORD, pwd)
    return true
  }

  lock = async () => {
    return await this.session.remove(this.PASSWORD)
  }
}
