import { type ReactNode } from 'react'
import { ThemeProvider } from 'next-themes'

import Message from '~components/message'

import '~styles/global.scss'

/**
 * Provider
 */

export default function UiProvider({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider enableSystem>
      {children}
      <Message />
    </ThemeProvider>
  )
}
