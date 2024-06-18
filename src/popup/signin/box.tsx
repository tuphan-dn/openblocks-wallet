import { useCallback, useState } from 'react'
import type { Provider } from '@supabase/supabase-js'
import { useNavigate } from 'react-router-dom'
import { useAsync } from 'react-use'
import clsx from 'clsx'

import {
  SiApple,
  SiGithub,
  SiGoogle,
  SiX,
} from '@icons-pack/react-simple-icons'
import { ArrowRight, Ellipsis, Eye, EyeOff } from 'lucide-react'
import { FullButton, LiteButton } from './signinButton'

import { getSession, signIn, signOut } from '~lib/auth'
import Password from '~lib/password'

export function SocialBox() {
  const [loading, setLoading] = useState(false)

  const onSignIn = useCallback(async (provider: Provider) => {
    setLoading(true)
    const url = await signIn(provider)
    if (url) {
      window.open(url)
      window.close()
    } else setLoading(false)
  }, [])

  return (
    <div className="w-full h-full flex flex-col gap-2">
      <div className="w-full grow p-2">
        <p className="opacity-60">
          Signin Openblocks Wallet with your social accounts
        </p>
      </div>
      <FullButton
        icon={SiGoogle}
        provider="Google"
        onClick={() => onSignIn('google')}
        loading={loading}
      />
      <FullButton
        icon={SiApple}
        provider="Apple"
        onClick={() => onSignIn('apple')}
        loading={loading}
      />
      <div className="flex flex-row gap-2">
        <LiteButton
          icon={SiX}
          onClick={() => onSignIn('twitter')}
          loading={loading}
        />
        <LiteButton
          icon={SiGithub}
          onClick={() => onSignIn('github')}
          loading={loading}
        />
        <div className="grow" />
        <button className="btn btn-square btn-ghost">
          <Ellipsis className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

export function LockBox() {
  const [loading, setLoading] = useState(false)
  const [hidden, setHidden] = useState(true)
  const [pwd, setPwd] = useState('')
  const navigate = useNavigate()

  const { value: session } = useAsync(getSession)

  const onSignOut = useCallback(async () => {
    setLoading(true)
    await signOut()
    setLoading(false)
  }, [])

  const onUnlock = useCallback(async () => {
    if (!pwd || !session?.user.id) return
    const password = new Password(session.user.id)
    const unlocked = await password.unlock(pwd)
    if (unlocked) navigate('/app')
  }, [session?.user.id, pwd, navigate])

  return (
    <div className="w-full h-full flex flex-col gap-2">
      <div className="grow flex flex-col gap-2 items-center">
        <div className="avatar">
          <div className="w-20 rounded-full ring-2 ring-base-100">
            <img
              src={session?.user?.user_metadata?.avatar_url}
              alt={session?.user?.email}
            />
          </div>
        </div>
        <p className="w-full text-center">{session?.user?.email}</p>
      </div>
      <div className="w-full input rounded-box !border-none !outline-none bg-base-100 flex flex-row items-center gap-4">
        <label className="swap">
          <input
            type="checkbox"
            checked={hidden}
            onChange={(e) => setHidden(e.target.checked)}
          />
          <Eye className="swap-on w-4 h-4" />
          <EyeOff className="swap-off w-4 h-4" />
        </label>
        <input
          placeholder="Password"
          type={hidden ? 'password' : 'text'}
          className="grow"
          value={pwd}
          onChange={(e) => setPwd(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && onUnlock()}
          autoFocus
        />
        <button
          className="btn btn-sm btn-ghost btn-square -mx-2"
          onClick={onUnlock}
          disabled={!pwd}
        >
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
      <p
        className="w-full mt-2 text-center opacity-60 cursor-pointer hover:underline flex flex-row gap-2 justify-center items-center"
        onClick={onSignOut}
      >
        <span>Use another account</span>
        <span
          className={clsx('loading loading-spinner loading-xs', {
            hidden: !loading,
          })}
        />
      </p>
    </div>
  )
}
