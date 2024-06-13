import { type CSSProperties, useState } from 'react'
import { useInterval } from 'react-use'
import clsx from 'clsx'

import { X } from 'lucide-react'

import { type MessageProps, useMessage } from './store'

export default function Alert({
  id,
  type,
  message,
  ttl,
  onClick,
}: MessageProps) {
  const [hover, setHover] = useState(false)
  const [counter, setCounter] = useState(0)
  const unregister = useMessage(({ unregister }) => unregister)

  useInterval(
    () => {
      if (counter >= 100) unregister(id)
      else setCounter(counter + 1)
    },
    hover ? null : Math.round(ttl / 100),
  )

  return (
    <div
      className={clsx(
        'cursor-pointer alert shadow-xl !w-[calc(100%-1rem)]',
        type,
      )}
      onClick={() => onClick()}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <p className="whitespace-normal">{message}</p>
      <div
        className="radial-progress cursor-pointer absolute top-2 right-2"
        style={
          {
            '--value': counter,
            '--size': '1rem',
            '--thickness': ttl >= 0 ? '1px' : '0px',
          } as CSSProperties
        }
        onClick={(e) => {
          e.stopPropagation()
          return unregister(id)
        }}
      >
        <X className="w-3 h-3" />
      </div>
    </div>
  )
}
