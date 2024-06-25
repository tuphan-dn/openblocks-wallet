import { useCallback, useState } from 'react'
import clsx from 'clsx'

import { SiGoogle } from '@icons-pack/react-simple-icons'

import { signInWithIdToken } from '~lib/auth'
import { usePushMessage } from '~components/message/store'
import { diagnosisError } from '~lib/utils'

export default function GoogleButton() {
  const [loading, setLoading] = useState(false)
  const pushMessage = usePushMessage()

  const onClick = useCallback(async () => {
    try {
      setLoading(true)
      await signInWithIdToken()
      location.reload()
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
