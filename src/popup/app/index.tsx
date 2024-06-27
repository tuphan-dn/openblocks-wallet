import { redirect, type RouteObject, Outlet } from 'react-router-dom'

import Page from './page'
import Token from './token'
import Nft from './nft'
import Navigation from './navigation'

import { getSession } from '~lib/auth'
import { Password } from '~lib/password'

export function Layout() {
  return (
    <div className="w-full h-full flex flex-col relative">
      <div className="w-full grow grid grid-cols-1">
        <div className="col-span-full min-h-full">
          <Outlet />
        </div>
      </div>
      <div className="w-full sticky bottom-0 left-0">
        <Navigation />
      </div>
    </div>
  )
}

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
