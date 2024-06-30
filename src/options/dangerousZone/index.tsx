import { useState } from 'react'

import Modal from '~components/ui/modal'

import { signOut } from '~lib/auth'

export default function DangerousZone() {
  const [open, setOpen] = useState(false)

  return (
    <div className="flex flex-col gap-2">
      <p className="w-full opacity-60 ml-4 text-sm text-error font-clash font-semibold tracking-wider">
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
            <button className="btn btn-error col-span-1" onClick={signOut}>
              Yes, I am
            </button>
          </div>
        </Modal>
      </div>
    </div>
  )
}
