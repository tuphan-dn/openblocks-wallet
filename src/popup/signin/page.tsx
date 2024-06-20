import { useEffect, useState } from 'react'
import { motion, useSpring } from 'framer-motion'
import { z } from 'zod'

import { Mouse } from 'lucide-react'
import Stack from './stack'
import PasswordBox from './box/password'
import SocialBox from './box/social'
import LockBox from './box/lock'

import { useSafeRouteLoaderData } from '~lib/hooks/useLoader'
import Noise from '~components/noise'

const MotionMouse = motion(Mouse)

export default function Page() {
  const [hover, setHover] = useState(false)
  const { layout } = useSafeRouteLoaderData(
    'signin',
    z.object({ layout: z.array(z.enum(['social', 'password', 'lock'])) }),
  )
  const x = useSpring(0, { duration: 300 })
  const y = useSpring(0, { duration: 300 })

  useEffect(() => {
    const move = (e: MouseEvent) => {
      x.set(e.clientX - 16)
      y.set(e.clientY - 16)
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [x, y])

  return (
    <div className="w-full h-full flex flex-col p-4">
      <div
        className="grow w-[calc(100%+2rem)] h-0 -m-4 cursor-none overflow-auto no-scrollbar relative"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <motion.div
          className="bg-base-100/60 backdrop-blur h-[32px] w-[32px] rounded-full fixed z-[9999] pointer-events-none flex flex-col justify-center items-center"
          style={{ left: x, top: y }}
          animate={{ opacity: hover ? 1 : 0 }}
        >
          <MotionMouse
            className="w-4 h-4"
            initial={{ translateY: 0 }}
            animate={{ translateY: [2, -2, 2] }}
            transition={{ repeat: Infinity, duration: 1 }}
          />
        </motion.div>
        <div className="w-full h-[1024px] relative">
          <Noise />
        </div>
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
