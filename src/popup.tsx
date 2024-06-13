import { useState } from 'react'

import '~styles/global.scss'

function IndexPopup() {
  const [data, setData] = useState('')

  return (
    <div className="w-64 h-64 flex flex-col p-4">
      <h1>
        Welcome to your <a href="https://www.plasmo.com">Plasmo</a> Extension!
      </h1>
      <input onChange={(e) => setData(e.target.value)} value={data} />
      <footer>Crafted by @PlasmoHQ</footer>
    </div>
  )
}

export default IndexPopup
