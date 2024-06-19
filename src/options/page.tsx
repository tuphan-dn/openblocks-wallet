import { useCallback } from 'react'
import { useAsync } from 'react-use'

import { getSession, signOut } from '~lib/auth'

export default function Page() {
  const { value: session } = useAsync(async () => {
    const session = await getSession()
    return session
  }, [])

  const onSignout = useCallback(async () => {
    await signOut()
    location.reload()
  }, [])

  return (
    <div className="w-full grid grid-cols-12 gap-4 p-4">
      <div className="col-span-full flex flex-row gap-4 items-center">
        <div className="avatar">
          <div className="w-16 rounded-full ring-2 ring-base-100">
            <img
              src={session?.user?.user_metadata?.avatar_url}
              alt={session?.user?.email}
            />
          </div>
        </div>
        <div className="flex flex-col">
          <p>{session?.user?.email}</p>
          <p
            className="text-sm text-error cursor-pointer hover:underline"
            onClick={onSignout}
          >
            Sign Out
          </p>
        </div>
      </div>
    </div>
  )
}
