import { useCallback, useState } from 'react'
import clsx from 'clsx'

import { SiGoogle } from '@icons-pack/react-simple-icons'

import { usePushMessage } from '~components/message/store'
import { diagnosisError } from '~lib/utils'
import { AuthType } from '~background/messages/auth'
import { signIn } from '~lib/auth'

export default function GoogleButton() {
  const [loading, setLoading] = useState(false)
  const pushMessage = usePushMessage()

  const onClick = useCallback(async () => {
    try {
      setLoading(true)
      await signIn({ type: AuthType.IdToken })
    } catch (er) {
      pushMessage('error', diagnosisError(er))
    } finally {
      setLoading(false)
    }
  }, [pushMessage])

  return (
    <button
      className="btn btn-square rounded-box"
      onClick={onClick}
      disabled={loading}
    >
      <SiGoogle className={clsx('w-4 h-4', { hidden: loading })} />
      <span
        className={clsx('loading loading-sm loading-spinner', {
          hidden: !loading,
        })}
      />
    </button>
  )
}
