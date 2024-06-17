import { redirect, type RouteObject } from 'react-router-dom'

import Layout from './layout'
import Page from './page'

import { getSession } from '~lib/supabase'

const Signin: RouteObject = {
  path: 'signin',
  element: <Layout />,
  loader: async () => {
    const session = await getSession()
    if (session) return redirect('/')
    return { session }
  },
  children: [{ index: true, element: <Page /> }],
}

export default Signin
