import { keccak_256 } from '@noble/hashes/sha3'
import { BN } from 'bn.js'
import { v4 } from 'uuid'

/**
 * Generate a random shape url
 * Resources: https://github.com/tuphan-dn/framer-shapes/tree/master
 * @param seed String seed
 * @returns URL
 */
export const randShape = (seed: string = v4()) => {
  const red = BN.red(new BN(123))
  const hash = keccak_256(seed)
  const rand = new BN(hash).toRed(red)
  const index = Number(rand.toString()) + 1
  return `https://raw.githubusercontent.com/tuphan-dn/framer-shapes/master/shape-${index}.svg`
}
