import axios from 'axios'
import { useCallback } from 'react'

import type { SignRequest, SignResponse } from '~background/messages/sign'
import { useSession } from '~lib/auth'
import { useTunnel } from '~lib/tunnel'

export default function Page() {
  const tunnel = useTunnel<SignRequest, SignResponse>()
  const session = useSession()

  const onApprove = useCallback(() => {
    tunnel?.send({ sig: 'sig', addr: '0xabd' })
    return window.close()
  }, [tunnel])

  const onRequest = useCallback(async () => {
    if (!session) return
    const { data } = await axios.get(
      'https://wkktjwtivwbkjnjyfwxb.supabase.co/functions/v1/secret-share',
      {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      },
    )
    console.log(data)
  }, [session])

  return (
    <div className="w-full h-full flex flex-col gap-4 p-4">
      <button className="btn btn-primary" onClick={onApprove}>
        Approve
      </button>
      <button className="btn btn-primary" onClick={onRequest}>
        Request
      </button>
      <p>
        Open Sans: Whereas disregard and contempt for human rights have resulted
      </p>
      <p className="font-clash">
        Clash Display: Whereas disregard and contempt for human rights have
        resulted
      </p>
    </div>
  )
}
