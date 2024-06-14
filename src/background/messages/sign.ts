import type { PlasmoMessaging } from '@plasmohq/messaging'
import { z } from 'zod'
import { openWindow, sendMessageToExtPage } from '~lib/tunnel'
import { diagnosisError } from '~lib/utils'

export const SignRequestDto = z.object({
  msg: z.string(),
})

export type SignRequest = z.infer<typeof SignRequestDto>

export const SignResponseDto = z.union([
  z.string(),
  z.object({
    addr: z.string(),
    sig: z.string(),
  }),
])

export type SignResponse = z.infer<typeof SignResponseDto>

const handler: PlasmoMessaging.MessageHandler<
  SignRequest,
  SignResponse
> = async (req, res) => {
  try {
    const id = await openWindow('/popup.html')
    if (!id) throw new Error('Cannot open the wallet')
    const body = SignRequestDto.parse(req.body)
    const data = await sendMessageToExtPage<SignRequest, SignResponse>(id, body)
    const re = SignResponseDto.parse(data)
    if (!id) throw new Error('User has rejected the request')
    return res.send(re)
  } catch (er) {
    return res.send(diagnosisError(er))
  }
}

export default handler
