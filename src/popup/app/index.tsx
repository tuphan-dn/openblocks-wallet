import { redirect, type RouteObject } from 'react-router-dom'

import Layout from './layout'
import Page from './page'
import Token from './token'
import Nft from './nft'

import { getSession } from '~lib/auth'
import { isInitialized } from '~lib/password'

const App: RouteObject = {
  path: 'app',
  element: <Layout />,
  loader: async () => {
    const session = await getSession()
    const initialized = await isInitialized()
    if (!session || !initialized) return redirect('/signin')
    return { session }
  },
  children: [
    {
      index: true,
      element: <Page />,
    },
    {
      path: 'token',
      element: <Token />,
    },
    {
      path: 'nft',
      element: <Nft />,
    },
  ],
}

export default App
