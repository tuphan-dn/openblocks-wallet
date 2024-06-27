import { redirect, type RouteObject } from 'react-router-dom'

import Layout from './layout'
import Page from './page'

import { getSession } from '~lib/auth'
import { Password } from '~lib/password'
import axios from 'axios'

const Signin: RouteObject = {
  path: 'signin',
  id: 'signin',
  element: <Layout />,
  loader: async () => {
    const session = await getSession()
    if (!session) return { layout: ['social', 'password', 'lock'] }

    const {
      data: { data, error },
    } = await axios.get<EdgeResponse<SecretShare[]>>(
      'https://wkktjwtivwbkjnjyfwxb.supabase.co/functions/v1/secret-share',
      {
        headers: { Authorization: `Bearer ${session.access_token}` },
      },
    )
    if (error) throw new Error(error.message)
    const secret_share = (data || [])[0]
    const password = new Password(session.user.id)
    const initialized = await password.isInitialized()
    if (!initialized)
      return { layout: ['password', 'lock', 'social'], secret_share }

    const unlocked = await password.isUnlocked()
    if (!unlocked)
      return { layout: ['lock', 'social', 'password'], secret_share }
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
