import type { PlasmoMessaging } from '@plasmohq/messaging'

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  console.log(req.body)
  const message = Date.now()

  res.send({
    message,
  })
}

export default handler
