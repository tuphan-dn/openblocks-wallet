import { useState } from 'react'

import '~styles/global.scss'

function IndexNewtab() {
  const [data, setData] = useState('')

  return (
    <div
      className="new-tab"
      style={{
        padding: 16,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <h1>Welcome to your Plasmo Extension!</h1>
      <input onChange={(e) => setData(e.target.value)} value={data} />
      <p>Crafted by @PlasmoHQ</p>
    </div>
  )
}

export default IndexNewtab
