import { type CSSProperties, useState, useMemo } from 'react'
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

  const alert = useMemo(() => {
    switch (type) {
      case 'info':
        return 'bg-info text-info-content'
      case 'success':
        return 'bg-success text-success-content'
      case 'warning':
        return 'bg-warning text-warning-content'
      case 'error':
        return 'bg-error text-error-content'
    }
  }, [type])

  return (
    <div
      className={clsx(
        'cursor-pointer flex flex-row items-center gap-2 shadow-lg !w-[calc(100%-1rem)] rounded-box p-4 backdrop-blur',
        alert,
      )}
      onClick={() => onClick()}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <p className="text-xs whitespace-normal">{message}</p>
      <div
        className="radial-progress cursor-pointer shrink-0"
        style={
          {
            '--value': counter,
            '--size': '1.5rem',
            '--thickness': ttl >= 0 ? '2px' : '0px',
          } as CSSProperties
        }
        onClick={(e) => {
          e.stopPropagation()
          return unregister(id)
        }}
      >
        <X className="w-4 h-4" />
      </div>
    </div>
  )
}
