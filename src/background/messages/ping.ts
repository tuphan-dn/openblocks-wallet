import type { PlasmoMessaging } from '@plasmohq/messaging'

export type PingRequest = {
  id: number
}

export type PingResponse = {
  id: number
  message: number
}

const handler: PlasmoMessaging.MessageHandler<
  PingRequest,
  PingResponse
> = async (req, res) => {
  const message = Date.now()

  res.send({
    id: req.body.id,
    message,
  })
}

export default handler
