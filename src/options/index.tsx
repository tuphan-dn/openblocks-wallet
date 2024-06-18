import { createMemoryRouter, RouterProvider } from 'react-router-dom'

import Error from './error'
import Layout from './layout'
import Page from './page'

import { getSession } from '~lib/supabase'

const router = createMemoryRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <Error />,
    loader: async () => {
      const session = await getSession()
      if (session) location.assign('/popup.html')
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