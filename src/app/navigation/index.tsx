import Link from './link'

export default function Navigation() {
  return (
    <div className="w-full bg-base-100/50 backdrop-blur px-4 grid grid-cols-4 gap-4 rounded-t-box">
      <button>Logo</button>
      <Link to="/token">Token</Link>
      <Link to="/nft">NFT</Link>
      <Link to="/settings">Settings</Link>
    </div>
  )
}
