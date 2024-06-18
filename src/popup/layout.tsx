import { Outlet } from 'react-router-dom'

import UiProvider from '~providers/ui.provider'

export default function Layout() {
  return (
    <UiProvider>
      <div className="w-full h-full grid grid-cols-1">
        <div className="col-span-full">
          <Outlet />
        </div>
      </div>
    </UiProvider>
  )
}
