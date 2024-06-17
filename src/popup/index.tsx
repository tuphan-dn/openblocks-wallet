import { createMemoryRouter, redirect, RouterProvider } from 'react-router-dom'

import Layout from './layout'
import Error from './error'
import Page from './page'
import Token from './token'
import Nft from './nft'

import { getSession } from '~lib/supabase'
import Signin from './signin'

const router = createMemoryRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <Error />,
    loader: async () => {
      const session = await getSession()
      if (!session) return redirect('/signin')
      return { session }
    },
    children: [
      {
        index: true,
        element: <Page />,
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
      const session = await getSession()
      if (session) return redirect('/')
      return { session }
    },
  },
])

export default function Popup() {
  return <RouterProvider router={router} />
}
