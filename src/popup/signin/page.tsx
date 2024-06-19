import { useEffect } from 'react'
import { motion, useSpring } from 'framer-motion'
import { z } from 'zod'

import Stack from './stack'
import PasswordBox from './box/password'
import SocialBox from './box/social'
import LockBox from './box/lock'

import { useSafeRouteLoaderData } from '~lib/hooks/useLoader'

export default function Page() {
  const { layout } = useSafeRouteLoaderData(
    'signin',
    z.object({ layout: z.array(z.enum(['social', 'password', 'lock'])) }),
  )
  const x = useSpring(0, { duration: 300 })
  const y = useSpring(0, { duration: 300 })

  useEffect(() => {
    const move = (e: MouseEvent) => {
      x.set(e.clientX - 8)
      y.set(e.clientY - 8)
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [x, y])

  return (
    <div className="w-full h-full flex flex-col gap-6 p-4">
      <div className="grow bg-primary/50 w-full rounded-box cursor-none relative">
        <motion.div
          className="bg-black h-[16px] w-[16px] rounded-full fixed z-[9999] pointer-events-none"
          style={{ left: x, top: y }}
        />
      </div>
      <Stack
        items={[
          {
            id: 'social',
            children: <SocialBox />,
          },
          {
            id: 'password',
            children: <PasswordBox />,
          },
          {
            id: 'lock',
            children: <LockBox />,
          },
        ]}
        layout={layout}
      />
    </div>
  )
}
