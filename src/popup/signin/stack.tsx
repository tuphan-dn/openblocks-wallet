import { type ReactNode } from 'react'
import { motion } from 'framer-motion'

export type Card = {
  id: string
  children: ReactNode
}

export type StackProps = {
  items: Card[]
  orders: string[]
  offset?: number
  scale?: number
}

export default function Stack({
  items,
  orders,
  offset = 6,
  scale = 0.025,
}: StackProps) {
  return (
    <div className="relative h-64 w-full">
      {orders
        .map((order) => items.find(({ id }) => id === order))
        .filter((e): e is Card => !!e)
        .map(({ id, children }, i) => (
          <motion.div
            key={id}
            className="absolute bg-base-100/50 backdrop-blur w-full h-full rounded-3xl p-4 shadow-lg border-2 border-base-200 origin-top flex flex-col gap-4"
            animate={{
              top: i * -offset,
              scale: 1 - i * scale,
              zIndex: items.length - i,
            }}
          >
            {children}
          </motion.div>
        ))}
    </div>
  )
}

export function next(orders: string[]) {
  const items = [...orders]
  items.unshift(items.pop()!)
  return items
}

export function prev(orders: string[]) {
  const items = [...orders]
  items.push(orders.shift()!)
  return items
}
