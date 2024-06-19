import { useState } from 'react'
import clsx from 'clsx'

import { Bell, BellOff } from 'lucide-react'

export type NotificationProps = {
  className?: string
}

export default function Notification({ className }: NotificationProps) {
  const [on, setOn] = useState(false)

  return (
    <label
      className={clsx(
        'btn btn-circle btn-lg btn-disabled backdrop-blur !border-none !outline-none shadow-outer swap swap-rotate',
        {
          'btn-primary hover:bg-primary/80': on,
          'bg-base-100/20 hover:bg-base-100/40': !on,
        },
        className,
      )}
    >
      <input
        type="checkbox"
        checked={on}
        onChange={(e) => setOn(e.target.checked)}
        disabled
      />
      <Bell className="swap-on w-4 h-4" />
      <BellOff className="swap-off w-4 h-4" />
    </label>
  )
}
