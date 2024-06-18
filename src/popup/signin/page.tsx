import { useCallback, useState } from 'react'
import type { Provider } from '@supabase/supabase-js'

import {
  SiApple,
  SiGithub,
  SiGoogle,
  SiX,
} from '@icons-pack/react-simple-icons'
import { Ellipsis } from 'lucide-react'
import Stack, { next, prev } from './stack'
import { FullButton, LiteButton } from './signinButton'

import { supabase } from '~lib/supabase'

export default function Page() {
  const [loading, setLoading] = useState(false)
  const [orders, setOrders] = useState(['green', 'blue'])

  const onSignin = useCallback(async (provider: Provider, scopes = 'email') => {
    setLoading(true)
    const {
      data: { url },
    } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        scopes,
        redirectTo: location.href.replace(/(#+)$/g, ''),
        skipBrowserRedirect: true,
      },
    })
    if (url) {
      window.open(url)
      window.close()
    } else setLoading(false)
  }, [])

  return (
    <div className="w-full h-full flex flex-col gap-4 p-4">
      <div className="grow bg-primary/50 w-full rounded-box"></div>
      <Stack
        items={[
          {
            id: 'green',
            children: (
              <div className="w-full h-full flex flex-col gap-2 rounded-box">
                <div className="w-full grow p-2">
                  <p className="opacity-60">
                    Signin Openblocks Wallet with your social accounts
                  </p>
                </div>
                <FullButton
                  icon={SiGoogle}
                  provider="Google"
                  onClick={() => onSignin('google')}
                  loading={loading}
                />
                <FullButton
                  icon={SiApple}
                  provider="Apple"
                  onClick={() => onSignin('apple')}
                  loading={loading}
                />
                <div className="flex flex-row gap-2">
                  <LiteButton
                    icon={SiX}
                    onClick={() => onSignin('twitter')}
                    loading={loading}
                  />
                  <LiteButton
                    icon={SiGithub}
                    onClick={() => onSignin('github')}
                    loading={loading}
                  />
                  <div className="grow" />
                  <button className="btn btn-square btn-ghost">
                    <Ellipsis className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ),
          },
          {
            id: 'blue',
            children: (
              <div className="w-full grid grid-cols-4 gap-2 rounded-box">
                <button
                  className="col-span-2 btn"
                  onClick={() => setOrders(prev(orders))}
                >
                  Prev
                </button>
                <button
                  className="col-span-2 btn"
                  onClick={() => setOrders(next(orders))}
                >
                  Next
                </button>
              </div>
            ),
          },
        ]}
        orders={orders}
      />
    </div>
  )
}
