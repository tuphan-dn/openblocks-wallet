import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import { SecureStorage } from '@plasmohq/storage/secure'

import Layout from './layout'
import Error from './error'
import Main from './main'
import Token from './token'
import Nft from './nft'

const router = createMemoryRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <Error />,
    loader: async () => {
      const storage = new SecureStorage()
      const jwt = await storage.get('jwt')
      if (!jwt) window.location.href = '/options.html'
      return { jwt }
    },
    children: [
      {
        index: true,
        element: <Main />,
      },
      {
        path: '/token',
        element: <Token />,
      },
      {
        path: '/nft',
        element: <Nft />,
      },
    ],
  },
])

export default function Popup() {
  return <RouterProvider router={router} />
}
