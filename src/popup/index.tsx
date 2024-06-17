import { createMemoryRouter, redirect, RouterProvider } from 'react-router-dom'
import { SecureStorage } from '@plasmohq/storage/secure'

import Layout from '~app/layout'
import Error from '~app/error'
import Main from '~app/main'
import Token from '~app/token'
import Nft from '~app/nft'
import Signin from '~app/signin'

const router = createMemoryRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <Error />,
    loader: async () => {
      const storage = new SecureStorage()
      const jwt = await storage.get('jwt')
      if (!jwt) return redirect('/signin')
      return { jwt }
    },
    children: [
      {
        index: true,
        loader: async () => {
          return [1]
        },
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
  {
    path: '/signin',
    element: <Signin />,
    errorElement: <Error />,
    loader: async () => {
      const storage = new SecureStorage()
      const jwt = await storage.get('jwt')
      if (jwt) return redirect('/')
      return {}
    },
  },
])

export default function Popup() {
  return <RouterProvider router={router} />
}
