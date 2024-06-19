import { useCallback, useMemo } from 'react'
import { useTheme } from 'next-themes'

import { Monitor, Moon, Sun } from 'lucide-react'
import clsx from 'clsx'

export type ThemeSwitchProps = {
  className?: string
}

export default function ThemeSwitch({ className }: ThemeSwitchProps) {
  const { theme, setTheme } = useTheme()

  const Icon = useMemo(() => {
    switch (theme) {
      case 'light':
        return Sun
      case 'dark':
        return Moon
      default:
        return Monitor
    }
  }, [theme])

  const onTheme = useCallback(() => {
    if (theme === 'system') return setTheme('light')
    if (theme === 'light') return setTheme('dark')
    return setTheme('system')
  }, [theme, setTheme])

  return (
    <button
      className={clsx(
        'btn btn-circle btn-lg bg-base-100/20 hover:bg-base-100/40 !border-none !outline-none backdrop-blur shadow-outer',
        className,
      )}
      onClick={onTheme}
    >
      <Icon className="w-4 h-4" />
    </button>
  )
}
