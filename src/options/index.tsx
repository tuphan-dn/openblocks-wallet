import {
  createMemoryRouter,
  RouterProvider,
  Outlet,
  useNavigation,
} from 'react-router-dom'

import Error from '~components/error'
import Splash from '~components/splash'
import Page from './page'

import UiProvider from '~providers/ui.provider'

import { getSession } from '~lib/auth'
import { Vault } from '~lib/vault'

function Layout() {
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

const router = createMemoryRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <Error />,
    loader: async () => {
      const session = await getSession()
      if (!session) return location.assign('/popup.html')
      const vault = new Vault(session)
      const unlocked = await vault.isUnlocked()
      if (!unlocked) return location.assign('/popup.html')
      return {}
    },
    children: [
      {
        index: true,
        element: <Page />,
      },
    ],
  },
])

export default function Options() {
  return <RouterProvider router={router} />
}
