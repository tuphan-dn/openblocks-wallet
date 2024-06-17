import { useEffect } from 'react'
import { Storage } from '@plasmohq/storage'
import { useStorage } from '@plasmohq/storage/hook'
import type { Provider, User } from '@supabase/supabase-js'

import { supabase } from '~lib/supabase'

export default function Options() {
  const [user, setUser] = useStorage<User | null>({
    key: 'user',
    instance: new Storage({
      area: 'local',
    }),
  })

  useEffect(() => {
    async function init() {
      const { data, error } = await supabase.auth.getSession()
      console.log(data, error)

      if (error) {
        console.error(error)
        return
      }
      if (!!data.session) {
        setUser(data.session.user)
      }
    }

    init()
  }, [])

  const handleOAuthLogin = async (provider: Provider, scopes = 'email') => {
    await supabase.auth.signInWithOAuth({
      provider,
      options: {
        scopes,
        redirectTo: location.href,
      },
    })
  }

  return (
    <main
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        top: 240,
        position: 'relative',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: 240,
          justifyContent: 'space-between',
          gap: 4.2,
        }}
      >
        {user && (
          <>
            <h3>
              {user.email} - {user.id}
            </h3>
            <button
              onClick={() => {
                supabase.auth.signOut()
                setUser(null)
              }}
            >
              Logout
            </button>
          </>
        )}
        {!user && (
          <button
            onClick={() => {
              handleOAuthLogin('github')
            }}
          >
            Sign in with GitHub
          </button>
        )}
      </div>
    </main>
  )
}
