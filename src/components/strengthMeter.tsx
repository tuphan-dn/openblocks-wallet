import { useMemo } from 'react'
import { useTheme } from 'next-themes'
import { motion } from 'framer-motion'

import palette from '@/palette.json'

export type StrengthMeterProps = {
  value: number
  range?: [number, number]
}

export default function StrengthMeter({
  value,
  range = [0, 50],
}: StrengthMeterProps) {
  const { resolvedTheme } = useTheme()

  const point = Math.round((value * 50) / (range[1] - range[0]))

  const base = useMemo(
    () => (resolvedTheme === 'dark' ? '#ffffff22' : '#00000022'),
    [resolvedTheme],
  )

  return (
    <div className="w-full flex flex-row items-center justify-between">
      {palette.map((bg, i) => (
        <motion.span
          key={bg}
          className="w-[2px] h-2 rounded-full"
          animate={{
            backgroundColor: point > i ? bg : base,
          }}
        />
      ))}
    </div>
  )
}
