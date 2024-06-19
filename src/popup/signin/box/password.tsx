import { useCallback, useState } from 'react'
import { useAsync } from 'react-use'
import clsx from 'clsx'

import { ArrowRight, Eye, EyeOff } from 'lucide-react'
import StrengthMeter from '~components/strengthMeter'

import { getSession, signOut } from '~lib/auth'
import Password from '~lib/password'

function passwordStrength(pwd: string) {
  let point = 0
  if (!pwd) return point
  if (/[A-Z]/.test(pwd)) point += 10
  if (/[a-z]/.test(pwd)) point += 10
  if (/[0-9]/.test(pwd)) point += 10
  if (pwd.length >= 8) point += 5
  if (pwd.length >= 10) point += 5
  if (pwd.length >= 12) point += 5
  if (/[^a-zA-Z0-9]/.test(pwd)) point += 5
  return point
}

export default function PasswordBox() {
  const [loading, setLoading] = useState(false)
  const [hidden, setHidden] = useState(true)
  const [pwd, setPwd] = useState('')

  const { value: session } = useAsync(getSession)

  const onSignOut = useCallback(async () => {
    setLoading(true)
    await signOut()
    setLoading(false)
  }, [])

  const onSubmit = useCallback(async () => {
    if (!pwd || !session?.user.id) return
    const password = new Password(session.user.id)
    await password.set(pwd)
    location.reload()
  }, [session?.user.id, pwd])

  return (
    <div className="w-full h-full flex flex-col gap-2">
      <div className="grow flex flex-col gap-2 items-center">
        <div className="avatar">
          <div className="w-16 rounded-full ring-2 ring-base-100">
            <img
              src={session?.user?.user_metadata?.avatar_url}
              alt={session?.user?.email}
            />
          </div>
        </div>
        <p className="w-full text-center">{session?.user?.email}</p>
      </div>
      <div className="w-[calc(100%-2rem)] mx-4">
        <StrengthMeter value={passwordStrength(pwd)} />
      </div>
      <div className="w-full input rounded-box !border-none !outline-none bg-base-100 flex flex-row items-center gap-4">
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
          placeholder="Set your password"
          type={hidden ? 'password' : 'text'}
          className="grow text-sm"
          value={pwd}
          onChange={(e) => setPwd(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && onSubmit()}
        />
        <button
          className="btn btn-sm btn-ghost btn-square -mx-2"
          onClick={onSubmit}
          disabled={!pwd}
        >
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
      <p
        className="w-full mt-2 text-center opacity-60 cursor-pointer hover:underline flex flex-row gap-2 justify-center items-center"
        onClick={onSignOut}
      >
        <span className="text-xs">Use another account</span>
        <span
          className={clsx('loading loading-spinner loading-xs', {
            hidden: !loading,
          })}
        />
      </p>
    </div>
  )
}
