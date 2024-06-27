import { useCallback } from 'react'
import axios from 'axios'

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
    const {
      data: { data, error },
    } = await axios.patch<EdgeResponse<SecretShare[]>>(
      'https://wkktjwtivwbkjnjyfwxb.supabase.co/functions/v1/secret-share',
      {
        secret: Math.random().toString(),
      },
      {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      },
    )
    if (error) throw new Error(error.message)
    console.log('POST', data)
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
