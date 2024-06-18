import clsx from 'clsx'

import { type LucideIcon } from 'lucide-react'

export type FullButtonProps = {
  icon: LucideIcon
  provider: string
  onClick: () => void | Promise<void>
  loading?: boolean
  disabled?: boolean
}

export function FullButton({
  icon: Icon,
  provider,
  onClick,
  loading = false,
  disabled = false,
}: FullButtonProps) {
  return (
    <button
      className="w-full btn bg-base-100 relative"
      onClick={onClick}
      disabled={loading || disabled}
    >
      <Icon className="absolute left-8 w-4 h-4" />
      Sign in with {provider}
      <span
        className={clsx('loading loading-spinner loading-sm', {
          hidden: !loading,
        })}
      />
    </button>
  )
}

export type LiteButtonProps = {
  icon: LucideIcon
  onClick: () => void | Promise<void>
  loading?: boolean
  disabled?: boolean
}

export function LiteButton({
  icon: Icon,
  onClick,
  loading = false,
  disabled = false,
}: LiteButtonProps) {
  return (
    <button
      className="btn btn-square bg-base-100"
      onClick={onClick}
      disabled={loading || disabled}
    >
      <Icon className={clsx('w-4 h-4', { hidden: loading })} />
      <span
        className={clsx('loading loading-spinner loading-sm', {
          hidden: !loading,
        })}
      />
    </button>
  )
}
