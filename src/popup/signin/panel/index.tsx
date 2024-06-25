import { useState } from 'react'

import Noise from '~components/noise'
import Cursor from './cursor'

export default function Panel() {
  const [active, setActive] = useState(false)

  return (
    <div
      className="w-full h-full rounded-b-3xl cursor-none relative overflow-hidden"
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
    >
      <Cursor visible={active} />
      <div className="w-full h-[calc(100%-2rem)] p-4 flex flex-col justify-between items-center gap-4">
        <div className="px-4 py-2 rounded-full backdrop-blur bg-base-100/50 shadow-out">
          <p className="opacity-60">Openblocks Wallet</p>
        </div>
        <span className="font-clash font-black text-4xl text-center mix-blend-color-burn">
          Openblocks Wallet: The modular crypto wallet; Especially, opensource.
        </span>
        <span />
      </div>
      <Noise />
    </div>
  )
}
