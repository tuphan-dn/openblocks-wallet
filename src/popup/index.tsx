import { createMemoryRouter, RouterProvider } from 'react-router-dom'

import Layout from '~app/layout'
import Error from '~app/error'
import Main from '~app/main'
import Token from '~app/token'

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
    ],
  },
])

export default function Popup() {
  return <RouterProvider router={router} />
}
