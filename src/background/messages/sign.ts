import { z } from 'zod'
import { factory } from '~background/factory'
import { openWindow, sendMessageToTunnel } from '~lib/tunnel'

export const SignRequestDto = z.object({
  msg: z.string(),
})
export type SignRequest = z.infer<typeof SignRequestDto>

export const SignResponseDto = z.object({
  addr: z.string(),
  sig: z.string(),
})
export type SignResponse = z.infer<typeof SignResponseDto>

const handler = factory(SignRequestDto, SignResponseDto, async ({ body }) => {
  const id = await openWindow('/popup.html')
  if (!id) throw new Error('Cannot open the wallet')
  const data = await sendMessageToTunnel<SignRequest, SignResponse>(id, body)
  if (!data) throw new Error('User has rejected the request')
  return data
})

export default handler
