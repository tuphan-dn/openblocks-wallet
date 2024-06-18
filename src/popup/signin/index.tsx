import { redirect, type RouteObject } from 'react-router-dom'

import Layout from './layout'
import Page from './page'

import { getSession } from '~lib/auth'
import { isInitialized } from '~lib/password'

const Signin: RouteObject = {
  path: 'signin',
  id: 'signin',
  element: <Layout />,
  loader: async () => {
    const session = await getSession()
    const initialized = await isInitialized()
    if (!session) return { layout: ['social', 'password'] }
    if (!initialized) return { layout: ['password', 'social'] }
    return redirect('/')
  },
  children: [
    {
      index: true,
      element: <Page />,
    },
  ],
}

export default Signin
