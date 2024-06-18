import { Storage } from '@plasmohq/storage'
import { keccak_256 } from '@noble/hashes/sha3'
import { encode } from 'bs58'

const HASH = 'hash'
const PASSWORD = 'password'

const storage = new Storage({
  area: 'session',
})

export const hash = (x: string) => {
  return encode(keccak_256(x))
}

export const isInitialized = async () => {
  const placeholder = await storage.get(HASH)
  return !!placeholder
}

export const isUnlocked = async () => {
  const pwd = await storage.get(PASSWORD)
  return !!pwd
}

export const set = async (prev: string, next: string) => {
  const placeholder = await storage.get(HASH)
  // Insert
  if (!placeholder && hash(prev) !== hash(next))
    throw new Error('Wrong confirmation')
  // Update
  if (placeholder && hash(prev) !== placeholder)
    throw new Error('Wrong password')
  return await storage.set(HASH, hash(next))
}

export const unlock = async (pwd: string) => {
  const placeholder = await storage.get(HASH)
  if (!placeholder) throw new Error('No password profile')
  if (hash(pwd) !== placeholder) throw new Error('Wrong password')
  return await storage.set(PASSWORD, pwd)
}

export const lock = async () => {
  return await storage.remove(PASSWORD)
}
