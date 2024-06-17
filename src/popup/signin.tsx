import { useCallback, useMemo, useState } from 'react'
import type { Provider } from '@supabase/supabase-js'
import { useAsync } from 'react-use'
import clsx from 'clsx'

import { SiGithub } from '@icons-pack/react-simple-icons'

import { getSession, supabase } from '~lib/supabase'

export default function Signin() {
  const [submitting, setSubmitting] = useState(false)

  const { value, loading: pending } = useAsync(async () => {
    const session = await getSession()
    return session
  }, [])

  const onSignin = useCallback(async (provider: Provider, scopes = 'email') => {
    setSubmitting(true)
    const {
      data: { url },
    } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        scopes,
        redirectTo: location.href,
        skipBrowserRedirect: true,
      },
    })
    if (url) window.open(url)
    else setSubmitting(false)
  }, [])

  const onSignout = useCallback(async () => {
    setSubmitting(true)
    await supabase.auth.signOut()
    window.location.reload()
  }, [])

  const loading = useMemo(() => submitting || pending, [submitting, pending])

  return (
    <div className="w-full h-full flex flex-col gap-2 items-center justify-center p-4">
      <div className={clsx('w-full grid grid-cols-4 gap-2', { hidden: value })}>
        <button
          className="col-span-full btn btn-secondary"
          onClick={() => onSignin('github')}
          disabled={loading}
        >
          <SiGithub className="w-4 h-4" />
          Sign in with GitHub
          <span
            className={clsx('loading loading-spinner loading-sm', {
              hidden: !loading,
            })}
          />
        </button>
      </div>
      <button
        className={clsx('w-full btn btn-error', { hidden: !value })}
        onClick={onSignout}
        disabled={loading}
      >
        Sign out
        <span
          className={clsx('loading loading-spinner loading-sm', {
            hidden: !loading,
          })}
        />
      </button>
    </div>
  )
}
