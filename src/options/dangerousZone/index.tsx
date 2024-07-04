import { useState } from 'react'

import { UserSignOutModal } from '~components/user'

export default function DangerousZone() {
  const [open, setOpen] = useState(false)

  return (
    <div className="flex flex-col gap-2">
      <p className="w-full opacity-60 ml-4 text-sm text-error-content font-clash font-semibold tracking-wider">
        Dangerous Zone
      </p>
      <div className="w-full bg-base-100/25 backdrop-blur rounded-3xl p-4 grid grid-cols-4 gap-4">
        <button className="col-span-full btn">Change Password</button>
        <button className="col-span-2 btn btn-error">Reveal Key</button>
        <button
          className="col-span-2 btn btn-warning"
          onClick={() => setOpen(true)}
        >
          Sign Out
        </button>
        <UserSignOutModal open={open} onCancel={() => setOpen(false)} />
      </div>
    </div>
  )
}
