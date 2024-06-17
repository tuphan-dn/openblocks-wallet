import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import { SecureStorage } from '@plasmohq/storage/secure'

import Error from './error'
import Layout from './layout'
import Signin from './signin'

const router = createMemoryRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <Error />,
    loader: async () => {
      const storage = new SecureStorage()
      const jwt = await storage.get('jwt')
      if (jwt) window.location.href = '/popup.html'
      return { jwt }
    },
    children: [
      {
        index: true,
        element: <Signin />,
      },
    ],
  },
])

export default function Options() {
  return <RouterProvider router={router} />
}
