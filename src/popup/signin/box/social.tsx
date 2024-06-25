import { useCallback, useEffect, useState } from 'react'
import type { Provider } from '@supabase/supabase-js'
import { useAnimate } from 'framer-motion'
import { useInterval } from 'react-use'
import clsx from 'clsx'

import {
  SiApple,
  SiGithub,
  SiGoogle,
  SiX,
  SiFacebook,
  type IconType,
} from '@icons-pack/react-simple-icons'
import { ArrowRight } from 'lucide-react'
import Modal from '~components/ui/modal'

import { signIn } from '~lib/auth'
import { diagnosisError, isEmailAddress } from '~lib/utils'

function SocialButton({
  icon: Icon,
  onClick,
  disabled = false,
}: {
  icon: IconType
  onClick: () => void | Promise<void>
  disabled?: boolean
}) {
  return (
    <button
      className="btn btn-square rounded-box"
      onClick={onClick}
      disabled={disabled}
    >
      <Icon className="w-4 h-4" />
    </button>
  )
}

export default function SocialBox() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [sent, setSent] = useState(0)
  const [scope, animate] = useAnimate()

  const onSignIn = useCallback(async (provider: Provider) => {
    setLoading(true)
    const url = await signIn({ provider })
    if (url) {
      window.open(url)
      window.close()
    } else setLoading(false)
  }, [])

  const onEmail = useCallback(async () => {
    try {
      setLoading(true)
      if (!isEmailAddress(email)) throw new Error('Invalid email address')
      await signIn({ email })
      setSent(60)
    } catch (er) {
      setError(diagnosisError(er))
    } finally {
      setLoading(false)
    }
  }, [email])

  useEffect(() => {
    if (error)
      animate(scope.current, { translateX: [0, 5, -5, 0] }, { duration: 0.1 })
  }, [error, animate])

  useInterval(
    () => setSent((prev) => Math.max(prev - 1, 1)),
    sent > 1 ? 1000 : null,
  )

  return (
    <div className="w-full h-full flex flex-col gap-4">
      <p className="font-semibold text-sm grow mx-2 opacity-60">
        Create and secure your wallets with social accounts.
      </p>
      <div className="flex flex-row gap-2 justify-between">
        <SocialButton
          icon={SiGoogle}
          onClick={() => onSignIn('google')}
          disabled
        />
        <SocialButton
          icon={SiApple}
          onClick={() => onSignIn('apple')}
          disabled
        />
        <SocialButton
          icon={SiFacebook}
          onClick={() => onSignIn('facebook')}
          disabled
        />
        <SocialButton icon={SiX} onClick={() => onSignIn('twitter')} disabled />
        <SocialButton
          icon={SiGithub}
          onClick={() => onSignIn('github')}
          disabled={loading}
        />
      </div>
      <span className="divider divider-vertical opacity-60 text-xs m-0">
        OR
      </span>
      <label
        className={clsx(
          'input !border-none bg-base-200 rounded-box flex flex-row gap-2 items-center',
          {
            '!outline-none': !error,
            'input-error': error,
          },
        )}
        ref={scope}
      >
        <input
          placeholder="Email"
          className="grow"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
            setError('')
            setSent(0)
          }}
          onKeyDown={(e) => e.key === 'Enter' && !loading && onEmail()}
        />
        <button
          className="btn btn-primary btn-square btn-sm -mr-2"
          onClick={onEmail}
          disabled={!!error || loading}
        >
          <ArrowRight className="w-4 h-4" />
        </button>
        <Modal open={!!sent} onCancel={() => setSent(0)}>
          <div className="grid grid-cols-2 gap-4">
            <h3 className="col-span-full font-bold font-clash">
              Check your mailbox
            </h3>
            <p className="col-span-full text-sm opacity-60 -mt-2 mb-2">
              A magic link was sent to your mailbox. Click to that link to
              verify your email and signin to the wallet.
            </p>
            <div className="col-span-full flex flex-col gap-2">
              <button
                className="w-full btn btn-primary"
                onClick={onEmail}
                disabled={sent > 1 || loading}
              >
                Resend the magic link
                {sent > 1 ? ` (${sent}s)` : ''}
              </button>
              <span
                className="my-2 hover:underline cursor-pointer text-xs text-center opacity-60"
                onClick={() => location.reload()}
              >
                I have received and activated the link!
              </span>
            </div>
          </div>
        </Modal>
      </label>
    </div>
  )
}
