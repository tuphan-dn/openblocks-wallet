import { z } from 'zod'
import { factory } from '~background/factory'

export const PingRequestDto = z.object({
  id: z.string(),
})
export type PingRequest = z.infer<typeof PingRequestDto>

export const PingResponseDto = z.object({
  id: z.string(),
  ts: z.number(),
})
export type PingResponse = z.infer<typeof PingResponseDto>

const handler = factory(PingRequestDto, PingResponseDto, async ({ body }) => {
  return { id: body.id, ts: Date.now() }
})
export default handler
