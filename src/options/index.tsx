import { createMemoryRouter, RouterProvider } from 'react-router-dom'

import Error from '~components/error'
import Layout from './layout'
import Page from './page'

import { getSession } from '~lib/auth'
import { Password } from '~lib/password'

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
