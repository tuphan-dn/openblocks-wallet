import { useCallback, useEffect, useState } from 'react'
import { useAnimate } from 'framer-motion'
import { useInterval } from 'react-use'
import clsx from 'clsx'

import { ArrowRight } from 'lucide-react'
import Modal from '~components/ui/modal'

import { signInWithOtp } from '~lib/auth'
import { diagnosisError, isEmailAddress } from '~lib/utils'

export default function EmailButton() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [sent, setSent] = useState(0)
  const [scope, animate] = useAnimate()

  const onEmail = useCallback(async () => {
    try {
      setLoading(true)
      if (!isEmailAddress(email)) throw new Error('Invalid email address')
      await signInWithOtp(email)
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
    <label
      className={clsx(
        'input bg-base-200 !outline-none rounded-box flex flex-row gap-2 items-center',
        {
          '!border-none': !error,
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
            A magic link was sent to your mailbox. Click to that link to verify
            your email and signin to the wallet.
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
  )
}
