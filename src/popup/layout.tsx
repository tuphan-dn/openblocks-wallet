import { Outlet, useNavigation } from 'react-router-dom'

import Splash from '~components/splash'
import UiProvider from '~providers/ui.provider'

export default function Layout() {
  const { state } = useNavigation()
  return (
    <UiProvider>
      <div className="w-full h-full grid grid-cols-1">
        <div className="col-span-full">
          <Outlet />
        </div>
      </div>
      <Splash open={state === 'loading'} />
    </UiProvider>
  )
}
