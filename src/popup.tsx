import { useCallback, useState } from 'react'
import { sendToBackground } from '@plasmohq/messaging'
import dayjs from 'dayjs'

import type { PingRequest, PingResponse } from '~background/messages/ping'

import '~styles/global.scss'

function IndexPopup() {
  const [date, setDate] = useState(Date.now())

  const onPing = useCallback(async () => {
    const { message } = await sendToBackground<PingRequest, PingResponse>({
      name: 'ping',
      body: {
        id: 123,
      },
    })
    setDate(message)
  }, [])

  return (
    <div className="w-[360px] h-[600px] bg-base-300/10 flex flex-col p-4 gap-4">
      <button className="btn btn-primary" onClick={onPing}>
        Ping
      </button>
      <p className="w-full opacity-60">
        {dayjs(date).format('HH:mm:ss, DD/MM/YYYY')}
      </p>
    </div>
  )
}

export default IndexPopup
