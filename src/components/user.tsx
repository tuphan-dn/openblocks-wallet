import { Fragment, useCallback, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAnimate } from 'framer-motion'
import clsx from 'clsx'

import { Eye, EyeOff } from 'lucide-react'
import Modal from './ui/modal'

import { randShape } from '~lib/graphic'
import { signOut, useSession } from '~lib/auth'

export function UserEmail() {
  const session = useSession()
  const email = useMemo(
    () => session?.user?.email || '',
    [session?.user?.email],
  )
  return <Fragment>{email}</Fragment>
}

export function UserAvatar({ className = 'w-16' }: { className?: string }) {
  const session = useSession()
  const email = useMemo(
    () => session?.user?.email || '',
    [session?.user?.email],
  )
  const url = useMemo(() => {
    return session?.user?.user_metadata?.avatar_url || randShape(email)
  }, [session?.user?.user_metadata?.avatar_url, email])

  return (
    <div className="avatar">
      <div
        className={clsx(
          'rounded-full bg-base-100/50 ring-4 ring-base-100/50',
          className,
        )}
      >
        <img src={url} alt={email} />
      </div>
    </div>
  )
}

export function UserSignOutModal({
  open = false,
  onCancel = () => {},
}: {
  open?: boolean
  onCancel?: () => void
}) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [hidden, setHidden] = useState(true)
  const [understanded, setUnderstanded] = useState(false)
  const [remembered, setRemembered] = useState(false)
  const [pwd, setPwd] = useState('')
  const [scope, animate] = useAnimate()
  const navigate = useNavigate()

  const onSignOut = useCallback(async () => {
    try {
      setLoading(true)
      if (!pwd) throw new Error('Wrong password')
      await signOut(pwd)
      onCancel()
      navigate('/app')
    } catch {
      animate(scope.current, { translateX: [0, 5, -5, 0] }, { duration: 0.1 })
      setError('Wrong password')
    } finally {
      setLoading(false)
    }
  }, [pwd, onCancel, navigate, scope, animate])

  useEffect(() => {
    if (!open) {
      setLoading(false)
      setError('')
      setHidden(true)
      setUnderstanded(false)
      setRemembered(false)
      setRemembered(false)
      setPwd('')
    }
  }, [open])

  return (
    <Modal open={open} onCancel={onCancel} visibleCloseButton={false}>
      <div className="w-full grid grid-cols-12 gap-2">
        <h3 className="col-span-full font-semibold font-clash">Sign Out</h3>
        <p className="col-span-full text-sm opacity-60 mt-2 mb-1">
          Please confirm your password to sign out.
        </p>
        <div
          className={clsx(
            'col-span-full input rounded-box bg-base-200 !outline-none flex flex-row items-center gap-4',
            {
              '!border-none': !error,
              'input-bordered !border-error-content': error,
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
            onKeyDown={(e) =>
              e.key === 'Enter' &&
              understanded &&
              remembered &&
              !loading &&
              onSignOut()
            }
            disabled={loading}
            autoFocus
          />
        </div>
        <div className="col-span-full flex flex-col gap-0">
          <div className="form-control">
            <label className="label cursor-pointer flex flex-row justify-start gap-2">
              <input
                type="checkbox"
                className="checkbox checkbox-sm"
                checked={remembered}
                onChange={(e) => setRemembered(e.target.checked)}
              />
              <span className="label-text-alt">
                I did <strong>REMEMBER MY PASSWORD</strong> for the next
                sign-in.
              </span>
            </label>
          </div>
          <div className="form-control">
            <label className="label cursor-pointer flex flex-row justify-start gap-2">
              <input
                type="checkbox"
                className="checkbox checkbox-sm"
                checked={understanded}
                onChange={(e) => setUnderstanded(e.target.checked)}
              />
              <span className="label-text-alt">
                I understand this device <strong>WOULD NOT</strong> recover my
                wallets by the <strong>Forgot Password</strong> after sign-out.
              </span>
            </label>
          </div>
        </div>
        <button className="col-span-6 btn" onClick={onCancel}>
          Cancel
        </button>
        <button
          className="col-span-6 btn btn-error"
          onClick={onSignOut}
          disabled={!understanded || !remembered || !pwd || !!error || loading}
        >
          Sign Out
          <span
            className={clsx('loading loading-spinner loading-sm', {
              hidden: !loading,
            })}
          />
        </button>
      </div>
    </Modal>
  )
}
