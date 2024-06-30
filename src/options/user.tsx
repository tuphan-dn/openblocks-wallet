import { useCallback } from 'react'

import { Home } from 'lucide-react'
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
          className="text-xs opacity-60 cursor-pointer hover:underline"
          onClick={onLock}
        >
          Lock Wallet
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
