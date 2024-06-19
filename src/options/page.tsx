import { useCallback } from 'react'
import { useAsync } from 'react-use'

import { Home } from 'lucide-react'
import General from './general'

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
      <div className="col-span-full top-0 flex flex-row gap-4 items-center p-2">
        <div className="avatar">
          <div className="w-16 rounded-full ring-2 ring-base-100">
            <img
              src={session?.user?.user_metadata?.avatar_url}
              alt={session?.user?.email}
            />
          </div>
        </div>
        <div className="flex flex-col gap-1 grow">
          <p>{session?.user?.email}</p>
          <p
            className="text-xs text-error cursor-pointer hover:underline"
            onClick={onSignout}
          >
            Sign Out
          </p>
        </div>
        <a
          className="btn btn-circle bg-base-200/20 hover:bg-base-200/40 backdrop-blur shadow-outer !border-none !outline-none"
          href="/popup.html"
        >
          <Home className="w-5 h-5" />
        </a>
      </div>
      <div className="col-span-full">
        <General />
      </div>
    </div>
  )
}
