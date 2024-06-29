import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAnimate } from 'framer-motion'
import clsx from 'clsx'
import { z } from 'zod'

import { ArrowRight, Eye, EyeOff } from 'lucide-react'
import { UserAvatar, UserEmail } from '~components/user'

import { signOut, useSession } from '~lib/auth'
import { Vault, type ExtendedSecretShare } from '~lib/vault'
import { useSafeRouteLoaderData } from '~lib/hooks/useLoader'

export default function LockBox() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [hidden, setHidden] = useState(true)
  const [pwd, setPwd] = useState('')
  const navigate = useNavigate()
  const [scope, animate] = useAnimate()
  const session = useSession()
  const { cloudshare } = useSafeRouteLoaderData(
    'signin',
    z.object({
      cloudshare: z
        .custom<ExtendedSecretShare>((e: string) =>
          e.split('/').reduce((a, b) => a && !!b, true),
        )
        .optional(),
    }),
  )

  const onUnlock = useCallback(async () => {
    try {
      setLoading(true)
      if (!session) throw new Error('Unauthorized request')
      if (!pwd) throw new Error('Empty password')
      const vault = new Vault(session)
      if (!cloudshare) await vault.unlock(pwd)
      else {
        const { localshare } = vault.new(pwd, cloudshare)
        await vault.set(pwd, localshare)
      }
      navigate('/app')
    } catch (er) {
      console.trace(er)
      animate(scope.current, { translateX: [0, 5, -5, 0] }, { duration: 0.1 })
      setError('Wrong password')
    } finally {
      setLoading(false)
    }
  }, [session, pwd, cloudshare, navigate, scope, animate])

  return (
    <div className="w-full h-full flex flex-col gap-2">
      <div className="grow flex flex-col gap-2 items-center">
        <UserAvatar />
        <p className="w-full text-center">
          <UserEmail />
        </p>
      </div>
      <div
        className={clsx(
          'w-full input rounded-box bg-base-200 !outline-none flex flex-row items-center gap-4',
          {
            '!border-none': !error,
            'input-error': error,
          },
        )}
        ref={scope}
      >
        <label className="swap">
          <input
            type="checkbox"
            checked={hidden}
            onChange={(e) => setHidden(e.target.checked)}
          />
          <EyeOff className="swap-on w-4 h-4" />
          <Eye className="swap-off w-4 h-4" />
        </label>
        <input
          placeholder="Password"
          type={hidden ? 'password' : 'text'}
          className="grow text-sm"
          value={pwd}
          onChange={(e) => {
            setError('')
            setPwd(e.target.value)
          }}
          onKeyDown={(e) => e.key === 'Enter' && onUnlock()}
          autoFocus
        />
        <button
          className="btn btn-sm btn-primary btn-square -mx-2"
          onClick={onUnlock}
          disabled={!pwd || loading}
        >
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
      <div className="w-full mt-2 flex flex-row gap-2 justify-center items-center">
        <p className="opacity-60 cursor-pointer hover:underline text-xs">
          Forgot Password
        </p>
        <span className="divider divider-horizontal m-0" />
        <p className="opacity-60 hover:underline text-xs" onClick={signOut}>
          Use another account
        </p>
      </div>
    </div>
  )
}
