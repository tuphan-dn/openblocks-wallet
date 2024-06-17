import { Outlet } from 'react-router-dom'

import UiProvider from '~providers/ui.provider'
import Navigation from './navigation'

export default function Layout() {
  return (
    <UiProvider>
      <div className="w-full h-full flex flex-col relative">
        <div className="w-full grow grid grid-cols-1">
          <div className="col-span-full min-h-full">
            <Outlet />
          </div>
        </div>
        <div className="w-full sticky bottom-0 left-0">
          <Navigation />
        </div>
      </div>
    </UiProvider>
  )
}
