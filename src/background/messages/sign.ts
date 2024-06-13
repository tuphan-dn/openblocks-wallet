import type { PlasmoMessaging } from '@plasmohq/messaging'
import { open, sendMessage } from '~lib/tunnel'

export type SignRequest = {
  msg: string
}

export type SignResponse =
  | string
  | {
      addr: string
      sig: string
    }

const handler: PlasmoMessaging.MessageHandler<
  SignRequest,
  SignResponse
> = async (req, res) => {
  const id = await open('/popup.html')
  if (!id) return res.send('Cannot open the wallet')
  const re = await sendMessage<SignRequest, SignResponse>(id, req.body)
  return res.send(re || 'User has rejected the request')
}

export default handler
