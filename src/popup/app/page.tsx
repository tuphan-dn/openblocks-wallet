import { useCallback } from 'react'

import ThemeSwitch from '~components/themeSwitch'

import type { SignRequest, SignResponse } from '~background/messages/sign'
import { useTunnel } from '~lib/tunnel'
import { signOut } from '~lib/auth'

export default function Page() {
  const tunnel = useTunnel<SignRequest, SignResponse>()

  const onApprove = useCallback(() => {
    tunnel?.send({ sig: 'sig', addr: '0xabd' })
    return window.close()
  }, [tunnel])

  return (
    <div className="w-full h-full flex flex-col gap-4 p-4">
      <button className="btn btn-secondary" onClick={signOut}>
        Sign out
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
