import { useEffect } from 'react'
import { motion, useSpring } from 'framer-motion'

import { Mouse } from 'lucide-react'

const MotionMouse = motion(Mouse)

export default function Cursor({ visible = false }: { visible?: boolean }) {
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
    <motion.div
      className="bg-base-100/60 backdrop-blur h-[32px] w-[32px] rounded-full fixed z-[9999] pointer-events-none flex flex-col justify-center items-center"
      style={{ left: x, top: y }}
      animate={{ opacity: visible ? 1 : 0 }}
    >
      <MotionMouse
        className="w-4 h-4"
        initial={{ translateY: -2 }}
        animate={{ translateY: [2, -2] }}
        transition={{ repeat: Infinity, duration: 1, repeatType: 'reverse' }}
      />
    </motion.div>
  )
}
