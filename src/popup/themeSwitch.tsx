'use client'
import { useMemo } from 'react'
import { useTheme } from 'next-themes'
import clsx from 'clsx'

import { Monitor, Moon, Sun } from 'lucide-react'
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'

export default function ThemeSwitch() {
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

  return (
    <Popover className="relative">
      <PopoverButton className="btn btn-sm btn-circle">
        <Icon className="w-3 h-3" />
      </PopoverButton>
      <PopoverPanel
        as="ul"
        anchor={{ to: 'left', gap: 5 }}
        className="z-10 menu menu-sm p-2 border-2 border-base-200 bg-base-100 rounded-box w-48 shadow-lg animate-pop-in"
      >
        <li>
          <button
            className={clsx({ active: theme === 'system' })}
            onClick={() => setTheme('system')}
          >
            <Monitor className="w-3 h-3" />
            System
          </button>
        </li>
        <li>
          <button
            className={clsx({ active: theme === 'light' })}
            onClick={() => setTheme('light')}
          >
            <Sun className="w-3 h-3" />
            Light
          </button>
        </li>
        <li>
          <button
            className={clsx({ active: theme === 'dark' })}
            onClick={() => setTheme('dark')}
          >
            <Moon className="w-3 h-3" />
            Dark
          </button>
        </li>
      </PopoverPanel>
    </Popover>
  )
}
