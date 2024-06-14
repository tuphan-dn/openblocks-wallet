import type { PlasmoMessaging } from '@plasmohq/messaging'
import { z } from 'zod'
import { diagnosisError } from '~lib/utils'

export const PingRequestDto = z.object({
  id: z.string(),
})

export type PingRequest = z.infer<typeof PingRequestDto>

export const PingResponseDto = z.union([
  z.string(),
  z.object({
    id: z.string(),
    ts: z.number(),
  }),
])

export type PingResponse = z.infer<typeof PingResponseDto>
const handler: PlasmoMessaging.MessageHandler<
  PingRequest,
  PingResponse
> = async (req, res) => {
  try {
    const body = PingRequestDto.parse(req.body)
    return res.send({ id: body.id, ts: Date.now() })
  } catch (er) {
    return res.send(diagnosisError(er))
  }
}

export default handler
