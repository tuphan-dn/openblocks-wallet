import type { PlasmoMessaging } from '@plasmohq/messaging'
import { openWindow, sendMessageWindow } from '~lib/tunnel'

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
  const id = await openWindow('/popup.html')
  if (!id) return res.send('Cannot open the wallet')
  const re = await sendMessageWindow<SignRequest, SignResponse>(id, req.body)
  return res.send(re || 'User has rejected the request')
}

export default handler
