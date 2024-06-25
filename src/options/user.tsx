import { useCallback, useState } from 'react'

import { Home } from 'lucide-react'
import Modal from '~components/ui/modal'

import { signOut, useSession } from '~lib/auth'
import { Password } from '~lib/password'

export default function User() {
  const [open, setOpen] = useState(false)
  const session = useSession()

  const onSignOut = useCallback(async () => {
    await signOut()
    location.reload()
  }, [])

  const onLock = useCallback(async () => {
    if (!session) return
    const password = new Password(session.user.id)
    await password.lock()
    location.reload()
  }, [session])

  return (
    <div className="w-full flex flex-row gap-4 items-center p-2">
      <div className="avatar">
        <div className="w-16 rounded-full ring-2 ring-base-100">
          <img
            src={session?.user?.user_metadata?.avatar_url}
            alt={session?.user?.email}
          />
        </div>
      </div>
      <div className="grow flex flex-col gap-1 min-w-0">
        <p className="truncate">{session?.user?.email}</p>
        <span className="flex flex-row gap-1 items-center">
          <p
            className="text-xs opacity-60 cursor-pointer hover:underline"
            onClick={onLock}
          >
            Lock Wallet
          </p>
          <span className="divider divider-horizontal m-0 py-1" />
          <p
            className="text-xs opacity-60 cursor-pointer hover:underline"
            onClick={() => setOpen(true)}
          >
            Sign Out
          </p>
        </span>
        <Modal open={open} onCancel={() => setOpen(false)}>
          <div className="w-full grid grid-cols-2 gap-y-4 gap-x-2">
            <h3 className="col-span-full font-semibold font-clash">Sign Out</h3>
            <p className="col-span-full text-sm opacity-60 -mt-2 mb-2">
              All the current account&apos;s data will be cleared! Are you sure
              to keep signing out?
            </p>
            <button className="btn col-span-1" onClick={() => setOpen(false)}>
              Cancel
            </button>
            <button className="btn btn-error col-span-1" onClick={onSignOut}>
              Yes, I am
            </button>
          </div>
        </Modal>
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
