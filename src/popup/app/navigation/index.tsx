import { NavLink } from 'react-router-dom'
import Link from './link'

export default function Navigation() {
  return (
    <div className="w-full bg-base-content/20 backdrop-blur px-4 grid grid-cols-4 rounded-t-box shadow-outer">
      <Link as={NavLink} className="col-span-1" to="/app" end>
        Logo
      </Link>
      <Link as={NavLink} to="/app/token" className="col-span-1" end>
        Token
      </Link>
      <Link as={NavLink} to="/app/nft" className="col-span-1" end>
        NFT
      </Link>
      <Link as="a" href="/options.html" className="col-span-1">
        Settings
      </Link>
    </div>
  )
}
