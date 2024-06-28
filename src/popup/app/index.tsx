import { redirect, type RouteObject, Outlet } from 'react-router-dom'

import Page from './page'
import Token from './token'
import Nft from './nft'
import Navigation from './navigation'

import { getSession } from '~lib/auth'
import { Vault } from '~lib/vault'

const App: RouteObject = {
  path: 'app',
  element: (
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
  ),
  loader: async () => {
    const session = await getSession()
    if (!session) return redirect('/signin')
    const vault = new Vault(session.user.id)
    const initialized = await vault.isInitialized()
    const unlocked = await vault.isUnlocked()
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
