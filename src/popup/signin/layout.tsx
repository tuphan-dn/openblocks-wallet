import { Outlet } from 'react-router-dom'

import UiProvider from '~providers/ui.provider'

export default function Layout() {
  return (
    <UiProvider>
      <div className="w-full h-full flex flex-col relative">
        <Outlet />
      </div>
    </UiProvider>
  )
}
