import { useCallback } from 'react'
import type { Provider } from '@supabase/supabase-js'

import {
  SiApple,
  SiX,
  SiFacebook,
  type IconType,
} from '@icons-pack/react-simple-icons'
import GoogleButton from './google'
import GithubButton from './github'
import EmailButton from './email'

import { signInWithOAuth } from '~lib/auth'

function SocialButton({
  icon: Icon,
  onClick,
  disabled = false,
}: {
  icon: IconType
  onClick: () => void | Promise<void>
  disabled?: boolean
}) {
  return (
    <button
      className="btn btn-square rounded-box"
      onClick={onClick}
      disabled={disabled}
    >
      <Icon className="w-4 h-4" />
    </button>
  )
}

export default function SocialBox() {
  const onSignIn = useCallback(async (provider: Provider) => {
    const url = await signInWithOAuth(provider)
    if (url) {
      window.open(url)
      window.close()
    }
  }, [])

  return (
    <div className="w-full h-full flex flex-col gap-4">
      <p className="font-semibold text-sm grow mx-2 opacity-60">
        Create and secure your wallets with social accounts.
      </p>
      <div className="flex flex-row gap-2 justify-between">
        <GoogleButton />
        <SocialButton
          icon={SiApple}
          onClick={() => onSignIn('apple')}
          disabled
        />
        <SocialButton
          icon={SiFacebook}
          onClick={() => onSignIn('facebook')}
          disabled
        />
        <SocialButton icon={SiX} onClick={() => onSignIn('twitter')} disabled />
        <GithubButton />
      </div>
      <span className="divider divider-vertical opacity-60 text-xs m-0">
        OR
      </span>
      <EmailButton />
    </div>
  )
}
