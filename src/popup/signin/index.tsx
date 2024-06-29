import { redirect, type RouteObject, Outlet } from 'react-router-dom'

import Page from './page'

import { getSession } from '~lib/auth'
import { Vault } from '~lib/vault'

const Signin: RouteObject = {
  path: 'signin',
  id: 'signin',
  element: <Outlet />,
  loader: async () => {
    const session = await getSession()
    if (!session) return { layout: ['social', 'password', 'lock'] }
    const vault = new Vault(session)
    const initialized = await vault.isInitialized()
    const unlocked = await vault.isUnlocked()
    if (!initialized) {
      const cloudshare = await vault.get()
      if (!cloudshare) return { layout: ['password', 'lock', 'social'] }
      else return { layout: ['lock', 'social', 'password'], cloudshare }
    } else {
      if (!unlocked) return { layout: ['lock', 'social', 'password'] }
      else return redirect('/')
    }
  },
  children: [
    {
      index: true,
      element: <Page />,
    },
  ],
}

export default Signin
