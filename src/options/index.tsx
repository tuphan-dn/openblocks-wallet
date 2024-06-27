import { createMemoryRouter, RouterProvider, Outlet } from 'react-router-dom'

import UiProvider from '~providers/ui.provider'
import Error from '~components/error'
import Page from './page'

import { getSession } from '~lib/auth'
import { Password } from '~lib/password'

export function Layout() {
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

const router = createMemoryRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <Error />,
    loader: async () => {
      const session = await getSession()
      if (!session) return location.assign('/popup.html')
      const password = new Password(session.user.id)
      const initialized = await password.isInitialized()
      const unlocked = await password.isUnlocked()
      if (!initialized || !unlocked) return location.assign('/popup.html')
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
