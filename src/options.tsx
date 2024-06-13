import { useState } from 'react'

function IndexOptions() {
  const [data, setData] = useState('')

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: 16,
      }}
    >
      <h1>Welcome to your Plasmo Extension!</h1>
      <input onChange={(e) => setData(e.target.value)} value={data} />
      <p>Crafted by @PlasmoHQ</p>
    </div>
  )
}

export default IndexOptions
