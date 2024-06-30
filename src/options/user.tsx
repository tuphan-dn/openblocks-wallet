import { useCallback } from 'react'

import { Home, Unlock } from 'lucide-react'
import { UserAvatar, UserEmail } from '~components/user'

import { useSession } from '~lib/auth'
import { Vault } from '~lib/vault'

export default function User() {
  const session = useSession()

  const onLock = useCallback(async () => {
    if (!session) return
    const vault = new Vault(session)
    await vault.lock()
    location.reload()
  }, [session])

  return (
    <div className="w-full flex flex-row gap-4 items-center p-2">
      <UserAvatar />
      <div className="grow flex flex-col gap-1 min-w-0">
        <p className="truncate">
          <UserEmail />
        </p>
        <p
          className="flex flex-row gap-2 items-center opacity-60 cursor-pointer group"
          onClick={onLock}
        >
          <Unlock className="w-3 h-3" />
          <span className="text-xs group-hover:underline">Lock Wallet</span>
        </p>
      </div>
      <a
        className="btn btn-circle bg-base-200/20 hover:bg-base-200/40 backdrop-blur shadow-outer !border-none !outline-none"
        href="/popup.html"
      >
        <Home className="w-4 h-4" />
      </a>
    </div>
  )
}
