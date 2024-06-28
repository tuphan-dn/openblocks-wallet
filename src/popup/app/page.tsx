import { useCallback } from 'react'

import type { SignRequest, SignResponse } from '~background/messages/sign'
import { useTunnel } from '~lib/tunnel'

export default function Page() {
  const tunnel = useTunnel<SignRequest, SignResponse>()

  const onApprove = useCallback(() => {
    tunnel?.send({ sig: 'sig', addr: '0xabd' })
    return window.close()
  }, [tunnel])

  return (
    <div className="w-full h-full flex flex-col gap-4 p-4">
      <button className="btn btn-primary" onClick={onApprove}>
        Approve
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
