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
      <PopoverButton className="btn btn-circle bg-base-content/20 hover:bg-base-content/40 !border-none !outline-none backdrop-blur shadow-outer">
        <Icon className="w-4 h-4" />
      </PopoverButton>
      <PopoverPanel
        as="ul"
        anchor={{ to: 'left', gap: 5 }}
        className="z-10 menu menu-sm p-2 bg-base-100/50 backdrop-blur rounded-box w-48 shadow-lg animate-pop-in"
      >
        <li>
          <button
            className={clsx({ '!bg-base-content/20': theme === 'system' })}
            onClick={() => setTheme('system')}
          >
            <Monitor className="w-3 h-3" />
            System
          </button>
        </li>
        <li>
          <button
            className={clsx({ '!bg-base-content/20': theme === 'light' })}
            onClick={() => setTheme('light')}
          >
            <Sun className="w-3 h-3" />
            Light
          </button>
        </li>
        <li>
          <button
            className={clsx({ '!bg-base-content/20': theme === 'dark' })}
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
