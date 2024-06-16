import { useCallback } from 'react'
import { sendToBackground } from '@plasmohq/messaging'
import { v4 } from 'uuid'
import dayjs from 'dayjs'

import ThemeSwitch from './themeSwitch'

import type { PingRequest, PingResponse } from '~background/messages/ping'
import type { SignRequest, SignResponse } from '~background/messages/sign'
import { useTunnel } from '~lib/tunnel'
import { usePushMessage } from '~components/message/store'

export default function Main() {
  const pushMessage = usePushMessage()
  const tunnel = useTunnel<SignRequest, SignResponse>()

  const onPing = useCallback(async () => {
    const data = await sendToBackground<PingRequest, PingResponse>({
      name: 'ping',
      body: {
        id: v4(),
      },
    })
    if (typeof data === 'string') return pushMessage('error', data)
    return pushMessage(
      'info',
      'phan son tu phan son tu phan son tu phan son tu phan son tu ' +
        dayjs(data.ts).format('HH:mm:ss, DD/MM/YYYY'),
    )
  }, [pushMessage])

  const onApprove = useCallback(() => {
    tunnel?.send({ sig: 'sig', addr: '0xabd' })
    return window.close()
  }, [tunnel])

  return (
    <div className="w-full h-full flex flex-col gap-4 p-4">
      <button className="btn btn-primary" onClick={onPing}>
        Ping
      </button>
      <button className="btn btn-primary" onClick={onApprove}>
        Approve
      </button>
      <p>
        Fonttest: Whereas disregard and contempt for human rights have resulted
      </p>
      <ThemeSwitch />
    </div>
  )
}
