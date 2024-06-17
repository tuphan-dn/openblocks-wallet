import { createMemoryRouter, RouterProvider } from 'react-router-dom'

import Layout from './layout'
import Error from './error'
import Page from './page'
import App from './app'
import Signin from './signin'

const router = createMemoryRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Page />,
      },
      App,
      Signin,
    ],
  },
])

export default function Popup() {
  return <RouterProvider router={router} />
}
