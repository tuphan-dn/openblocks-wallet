import { redirect, type RouteObject } from 'react-router-dom'

import Layout from './layout'
import Page from './page'

import { getSession } from '~lib/auth'
import { Password } from '~lib/password'

const Signin: RouteObject = {
  path: 'signin',
  id: 'signin',
  element: <Layout />,
  loader: async () => {
    const session = await getSession()
    if (!session) return { layout: ['social', 'password', 'lock'] }
    const password = new Password(session.user.id)
    const initialized = await password.isInitialized()
    if (!initialized) return { layout: ['password', 'lock', 'social'] }
    const unlocked = await password.isUnlocked()
    if (!unlocked) return { layout: ['lock', 'social', 'password'] }
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
