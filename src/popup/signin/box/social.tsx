import { useCallback, useState } from 'react'
import type { Provider } from '@supabase/supabase-js'

import {
  SiApple,
  SiGithub,
  SiGoogle,
  SiX,
} from '@icons-pack/react-simple-icons'
import { Ellipsis } from 'lucide-react'
import { FullButton, LiteButton } from './signinButton'

import { signIn } from '~lib/auth'

export default function SocialBox() {
  const [loading, setLoading] = useState(false)

  const onSignIn = useCallback(async (provider: Provider) => {
    setLoading(true)
    const url = await signIn(provider)
    if (url) {
      window.open(url)
      window.close()
    } else setLoading(false)
  }, [])

  return (
    <div className="w-full h-full flex flex-col gap-2">
      <div className="w-full grow p-2">
        <p className="opacity-60">
          Signin Openblocks Wallet with your social accounts
        </p>
      </div>
      <FullButton
        icon={SiGoogle}
        provider="Google"
        onClick={() => onSignIn('google')}
        loading={loading}
      />
      <FullButton
        icon={SiApple}
        provider="Apple"
        onClick={() => onSignIn('apple')}
        loading={loading}
      />
      <div className="flex flex-row gap-2">
        <LiteButton
          icon={SiX}
          onClick={() => onSignIn('twitter')}
          loading={loading}
        />
        <LiteButton
          icon={SiGithub}
          onClick={() => onSignIn('github')}
          loading={loading}
        />
        <div className="grow" />
        <button className="btn btn-square btn-ghost">
          <Ellipsis className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
