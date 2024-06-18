import { useCallback, useMemo, useState } from 'react'
import { useAsync } from 'react-use'
import { motion } from 'framer-motion'
import clsx from 'clsx'

import { ArrowRight, Eye, EyeOff } from 'lucide-react'

import { getSession, signOut } from '~lib/auth'
import Password from '~lib/password'
import { useTheme } from 'next-themes'

const palette = [
  '#ff918f',
  '#ff9099',
  '#ff8fa3',
  '#ff8fae',
  '#ff8fb9',
  '#ff90c4',
  '#ff92d0',
  '#ff95db',
  '#fd98e6',
  '#f89cf2',
  '#f0a0fc',
  '#e8a5ff',
  '#dcabff',
  '#d0b3ff',
  '#c4b9ff',
  '#babfff',
  '#b0c3ff',
  '#a6c7ff',
  '#9ccbff',
  '#92ceff',
  '#87d1ff',
  '#7ad5ff',
  '#6bd8ff',
  '#58dbff',
  '#3adeff',
  '#00e2ff',
  '#00e6ff',
  '#00e8ff',
  '#00eaf8',
  '#00ecef',
  '#00eee5',
  '#00f1da',
  '#00f3ce',
  '#00f6c1',
  '#00f7b2',
  '#0cf7a5',
  '#45f797',
  '#62f789',
  '#7af67c',
  '#8ff570',
]

function passwordStrength(pwd: string) {
  let point = 0
  if (!pwd) return point
  if (/[A-Z]/.test(pwd)) point += 8
  if (/[a-z]/.test(pwd)) point += 8
  if (/[0-9]/.test(pwd)) point += 8
  if (pwd.length >= 8) point += 4
  if (pwd.length >= 10) point += 4
  if (pwd.length >= 12) point += 4
  if (/[^a-zA-Z0-9]/.test(pwd)) point += 4
  return point
}

export default function PasswordBox() {
  const [loading, setLoading] = useState(false)
  const [hidden, setHidden] = useState(true)
  const [pwd, setPwd] = useState('')
  const { resolvedTheme } = useTheme()

  const { value: session } = useAsync(getSession)
  const base = useMemo(
    () => (resolvedTheme === 'dark' ? '#ffffff22' : '#00000022'),
    [resolvedTheme],
  )

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
      <div className="w-[calc(100%-2rem)] mx-4 flex flex-row items-center justify-between">
        {palette.map((bg, i) => (
          <motion.span
            key={bg}
            className="w-[2px] h-2 rounded"
            animate={{
              backgroundColor: passwordStrength(pwd) > i ? bg : base,
            }}
          />
        ))}
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
          placeholder="Set your password"
          type={hidden ? 'password' : 'text'}
          className="grow"
          value={pwd}
          onChange={(e) => setPwd(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && onSubmit()}
          autoFocus
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
