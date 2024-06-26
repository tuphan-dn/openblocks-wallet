import { useCallback } from 'react'

import {
  SiApple,
  SiX,
  SiFacebook,
  type IconType,
} from '@icons-pack/react-simple-icons'
import GoogleButton from './google'
import GithubButton from './github'
import EmailButton from './email'

import { signIn } from '~lib/auth'
import { AuthProvider, AuthType } from '~background/messages/auth'

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
  const onSignIn = useCallback(async (provider: AuthProvider) => {
    const re = await signIn({ type: AuthType.OAuth, provider })
    if (typeof re === 'string') throw new Error(re)
    window.open(re.url)
    window.close()
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
          onClick={() => onSignIn(AuthProvider.Apple)}
          disabled
        />
        <SocialButton
          icon={SiFacebook}
          onClick={() => onSignIn(AuthProvider.Facebook)}
          disabled
        />
        <SocialButton
          icon={SiX}
          onClick={() => onSignIn(AuthProvider.Twitter)}
          disabled
        />
        <GithubButton />
      </div>
      <span className="divider divider-vertical opacity-60 text-xs m-0">
        OR
      </span>
      <EmailButton />
    </div>
  )
}
