import { type ReactNode } from 'react'
import clsx from 'clsx'

import { NavLink } from 'react-router-dom'

import './index.scss'

export type LinkProps = {
  to: string
  children: ReactNode
}

export default function Link({ to, children }: LinkProps) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        clsx(
          'navlink col-span-1 group relative px-2 py-4 font-bold text-center transition-all hover:text-primary',
          {
            active: isActive,
          },
        )
      }
    >
      {children}
      <div className="navlink-indicator absolute bottom-0 left-0 h-1 bg-primary rounded-t transition-all group-hover:opacity-100 group-hover:w-full" />
    </NavLink>
  )
}
