import clsx from 'clsx'
import { Bell, BellOff } from 'lucide-react'

export type NotificationProps = {
  className?: string
}

export default function Notification({ className }: NotificationProps) {
  return (
    <label
      className={clsx(
        'btn btn-circle btn-lg bg-base-100/20 hover:bg-base-100/40 !border-none !outline-none backdrop-blur shadow-outer swap swap-rotate',
        className,
      )}
    >
      <input type="checkbox" />
      <Bell className="swap-on w-4 h-4" />
      <BellOff className="swap-off w-4 h-4" />
    </label>
  )
}
