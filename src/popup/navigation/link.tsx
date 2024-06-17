import { useState, type ComponentProps, type ElementType } from 'react'
import clsx from 'clsx'

import { AnimatePresence, motion } from 'framer-motion'

import './index.scss'

export default function Link<T extends ElementType>({
  as: As,
  children,
  className,
  ...props
}: ComponentProps<T> & { as: T }) {
  const [hover, setHover] = useState(false)

  return (
    <As
      className={clsx(
        'navlink relative px-2 py-4 font-bold text-center transition-all text-base-content hover:text-primary',
        className,
      )}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      {...props}
    >
      <AnimatePresence>
        {hover && (
          <motion.span
            className="w-[calc(100%-0.5rem)] h-1 absolute bottom-0 left-1 bg-primary rounded-t"
            layoutId="underline"
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: { duration: 0.15 },
            }}
            exit={{
              opacity: 0,
              transition: { duration: 0.15, delay: 0.2 },
            }}
          />
        )}
      </AnimatePresence>
      {children}
      <span className="navlink-indicator w-[calc(100%-0.5rem)] h-1 absolute bottom-0 left-1 bg-primary rounded-t" />
    </As>
  )
}
