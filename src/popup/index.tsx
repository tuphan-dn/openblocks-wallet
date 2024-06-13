import { useCallback, useState } from 'react'
import { sendToBackground } from '@plasmohq/messaging'
import { v4 } from 'uuid'
import dayjs from 'dayjs'

import type { PingRequest, PingResponse } from '~background/messages/ping'
import type { SignRequest, SignResponse } from '~background/messages/sign'
import { useTunnel } from '~lib/tunnel'

import '~styles/global.scss'

export default function Popup() {
  const [date, setDate] = useState(Date.now())
  const tunnel = useTunnel<SignRequest, SignResponse>()

  const onPing = useCallback(async () => {
    const { message } = await sendToBackground<PingRequest, PingResponse>({
      name: 'ping',
      body: {
        id: v4(),
      },
    })
    setDate(message)
  }, [])

  const onApprove = useCallback(() => {
    tunnel.send({ sig: 'sig', addr: '0xabd' })
    return window.close()
  }, [tunnel])

  return (
    <div className="w-full h-full flex flex-col p-4 gap-4">
      <button className="btn btn-primary" onClick={onPing}>
        Ping
      </button>
      <button className="btn btn-primary" onClick={onApprove}>
        Approve
      </button>
      <p className="w-full opacity-60">
        {dayjs(date).format('HH:mm:ss, DD/MM/YYYY')}
      </p>
      <p>
        Fonttest: Whereas disregard and contempt for human rights have resulted
      </p>
    </div>
  )
}
