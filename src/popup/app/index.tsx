import { redirect, type RouteObject } from 'react-router-dom'

import Layout from './layout'
import Page from './page'
import Token from './token'
import Nft from './nft'

import { getSession } from '~lib/auth'
import { Password } from '~lib/password'

const App: RouteObject = {
  path: 'app',
  element: <Layout />,
  loader: async () => {
    const session = await getSession()
    if (!session) return redirect('/signin')
    const password = new Password(session.user.id)
    const initialized = await password.isInitialized()
    const unlocked = await password.isUnlocked()
    if (!initialized || !unlocked) return redirect('/signin')
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
