import numbro from 'numbro'
import { fromError, isZodErrorLike } from 'zod-validation-error'

/**
 * Delay by async/await
 * @param ms - milisenconds
 * @returns A promise
 */
export const delay = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * Wrapped Numbro - https://numbrojs.com/old-format.html
 * @param value Value
 * @returns The numeric string
 */
export const numeric = (
  value?: number | string | bigint,
): ReturnType<typeof numbro> => {
  if (!value) return numbro('0')
  return numbro(value)
}

/**
 * Diagnosis the error string
 * @param er Any value
 * @returns The error string
 */
export function diagnosisError(er: any): string {
  if (isZodErrorLike(er)) return fromError(er).toString()
  if (er?.response?.data) return er.response.data.toString() // Axios
  if (er?.message) return er.message.toString() // Error
  return er.toString()
}

/**
 * Shorten a string
 * @param str The string
 * @param num The number of remaining prefix/suffix chracters
 * @param delimiter The delimiter
 * @returns The shortened string
 */
export function shortenString(str: string, num = 4, delimiter = '...') {
  if (!str) return ''
  if (str.length <= num * 2) return str
  return (
    str.substring(0, num) +
    delimiter +
    str.substring(str.length - num, str.length)
  )
}
