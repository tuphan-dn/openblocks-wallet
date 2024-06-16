import { createMemoryRouter, RouterProvider } from 'react-router-dom'

import Layout from '~app/layout'
import Error from '~app/error'
import Main from '~app/main'
import Token from '~app/token'
import Nft from '~app/nft'

const router = createMemoryRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <Error />,
    children: [
      {
        path: '/',
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
