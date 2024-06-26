import { useCallback, useState } from 'react'
import clsx from 'clsx'

import { SiGithub } from '@icons-pack/react-simple-icons'

import { usePushMessage } from '~components/message/store'
import { signIn } from '~lib/auth'
import { diagnosisError } from '~lib/utils'
import { AuthProvider, AuthType } from '~background/messages/auth'

export default function GithubButton() {
  const [loading, setLoading] = useState(false)
  const pushMessage = usePushMessage()

  const onClick = useCallback(async () => {
    try {
      setLoading(true)
      const re = await signIn({
        type: AuthType.OAuth,
        provider: AuthProvider.Github,
      })
      if (typeof re === 'string') throw new Error(re)
      window.open(re.url)
      window.close()
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
