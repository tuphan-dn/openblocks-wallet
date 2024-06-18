import { Outlet } from 'react-router-dom'

import UiProvider from '~providers/ui.provider'

export default function Layout() {
  return (
    <UiProvider>
      <div className="w-full h-full flex flex-col relative">
        <div className="w-full grow grid grid-cols-1">
          <div className="col-span-full min-h-full">
            <Outlet />
          </div>
        </div>
      </div>
    </UiProvider>
  )
}
