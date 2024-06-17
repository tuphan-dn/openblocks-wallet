import { NavLink } from 'react-router-dom'

import Link from './link'
import clsx from 'clsx'

export default function Navigation() {
  return (
    <div className="w-full bg-base-content/20 backdrop-blur px-4 grid grid-cols-4 rounded-t-box">
      <Link
        as={NavLink}
        className={({ isActive }) => clsx('col-span-1', { active: isActive })}
        to="/"
      >
        Logo
      </Link>
      <Link
        as={NavLink}
        to="/token"
        className={({ isActive }) => clsx('col-span-1', { active: isActive })}
      >
        Token
      </Link>
      <Link
        as={NavLink}
        to="/nft"
        className={({ isActive }) => clsx('col-span-1', { active: isActive })}
      >
        NFT
      </Link>
      <Link as="button" className="col-span-1">
        Settings
      </Link>
    </div>
  )
}
