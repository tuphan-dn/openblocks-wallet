import Link from './link'

export default function Navigation() {
  return (
    <div className="w-full bg-base-content/20 backdrop-blur px-4 grid grid-cols-4 rounded-t-box">
      <Link to="/" className="col-span-1">
        Logo
      </Link>
      <Link to="/token" className="col-span-1">
        Token
      </Link>
      <Link to="/nft" className="col-span-1">
        NFT
      </Link>
      <button className="col-span-1">Settings</button>
    </div>
  )
}
