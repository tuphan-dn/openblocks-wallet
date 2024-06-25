import { type ReactNode } from 'react'
import { motion } from 'framer-motion'

export type Card = {
  id: string
  children: ReactNode
}

export type StackProps = {
  items: Card[]
  layout: string[]
  offset?: number
  scale?: number
}

export default function Stack({
  items,
  layout,
  offset = 6,
  scale = 0.025,
}: StackProps) {
  return (
    <div className="relative h-64 w-full">
      {layout
        .map((order) => items.find(({ id }) => id === order))
        .filter((e): e is Card => !!e)
        .map(({ id, children }, i) => (
          <motion.div
            key={id}
            className="absolute w-full h-full rounded-3xl p-4 bg-base-100 shadow-lg ring-2 ring-base-300/50 origin-top flex flex-col gap-4"
            animate={{
              top: i * -offset,
              scale: 1 - i * scale,
              zIndex: items.length - i,
            }}
          >
            {!i ? children : null}
          </motion.div>
        ))}
    </div>
  )
}

export function next<T>(layout: Array<T>): Array<T> {
  const items = [...layout]
  items.unshift(items.pop()!)
  return items
}

export function prev<T>(layout: Array<T>): Array<T> {
  const items = [...layout]
  items.push(layout.shift()!)
  return items
}
