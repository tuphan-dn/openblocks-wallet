import { Fragment, useMemo } from 'react'
import clsx from 'clsx'

import { useSession } from '~lib/auth'
import { randShape } from '~lib/graphic'

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
