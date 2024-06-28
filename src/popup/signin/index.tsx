import { redirect, type RouteObject, Outlet } from 'react-router-dom'
import axios from 'axios'

import Page from './page'

import { getSession } from '~lib/auth'
import { Vault } from '~lib/vault'

const Signin: RouteObject = {
  path: 'signin',
  id: 'signin',
  element: <Outlet />,
  loader: async () => {
    // New wallet
    const session = await getSession()
    if (!session) return { layout: ['social', 'password', 'lock'] }

    // Current user
    const vault = new Vault(session.user.id)
    const initialized = await vault.isInitialized()
    if (!initialized) return { layout: ['password', 'lock', 'social'] }

    // Old user
    const {
      data: { data, error },
    } = await axios.get<EdgeResponse<SecretShare[]>>(
      'https://wkktjwtivwbkjnjyfwxb.supabase.co/functions/v1/secret-share',
      {
        headers: { Authorization: `Bearer ${session.access_token}` },
      },
    )
    if (error) throw new Error(error.message)
    const [secret_share] = data || []
    if (secret_share)
      return { layout: ['lock', 'social', 'password'], share: secret_share }

    const unlocked = await vault.isUnlocked()
    if (!unlocked)
      return { layout: ['lock', 'social', 'password'], share: secret_share }
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
