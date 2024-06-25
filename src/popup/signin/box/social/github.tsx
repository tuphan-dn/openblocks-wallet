import { useCallback, useState } from 'react'
import clsx from 'clsx'

import { SiGithub } from '@icons-pack/react-simple-icons'

import { usePushMessage } from '~components/message/store'
import { signInWithOAuth } from '~lib/auth'
import { diagnosisError } from '~lib/utils'

export default function GithubButton() {
  const [loading, setLoading] = useState(false)
  const pushMessage = usePushMessage()

  const onClick = useCallback(async () => {
    try {
      setLoading(true)
      const url = await signInWithOAuth('github')
      if (url) {
        window.open(url)
        window.close()
      }
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
      <SiGithub className={clsx('w-4 h-4', { hidden: loading })} />
      <span
        className={clsx('loading loading-sm loading-spinner', {
          hidden: !loading,
        })}
      />
    </button>
  )
}
