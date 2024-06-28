import { useCallback, useState } from 'react'
import clsx from 'clsx'
import axios from 'axios'

import { ArrowRight, Eye, EyeOff } from 'lucide-react'
import StrengthMeter from '~components/strengthMeter'
import { UserAvatar, UserEmail } from '~components/user'

import { signOut, useSession } from '~lib/auth'
import { Vault } from '~lib/vault'
import { usePushMessage } from '~components/message/store'
import { diagnosisError } from '~lib/utils'

function passwordStrength(pwd: string) {
  let point = 0
  if (!pwd) return point
  if (/[A-Z]/.test(pwd)) point += 10
  if (/[a-z]/.test(pwd)) point += 10
  if (/[0-9]/.test(pwd)) point += 10
  if (pwd.length >= 8) point += 5
  if (pwd.length >= 10) point += 5
  if (pwd.length >= 12) point += 5
  if (/[^a-zA-Z0-9]/.test(pwd)) point += 5
  return point
}

export default function PasswordBox() {
  const [loading, setLoading] = useState(false)
  const [hidden, setHidden] = useState(true)
  const [pwd, setPwd] = useState('')
  const pushMessage = usePushMessage()
  const session = useSession()

  const onSubmit = useCallback(async () => {
    try {
      setLoading(true)
      if (!pwd) throw new Error('Empty password')
      if (!session?.user.id) throw new Error('Unauthorized request')
      const vault = new Vault(session.user.id)
      const { localshare, cloudshare } = await vault.new(pwd)
      const pubkey = await vault.set(pwd, localshare)
      const {
        data: { error },
      } = await axios.post<EdgeResponse<SecretShare[]>>(
        'https://wkktjwtivwbkjnjyfwxb.supabase.co/functions/v1/secret-share',
        {
          id: pubkey,
          secret: cloudshare,
        },
        {
          headers: {
            Authorization: `Bearer ${session.access_token}`,
          },
        },
      )
      if (error) throw new Error(error.message)
      location.reload()
    } catch (er) {
      pushMessage('error', diagnosisError(er))
    } finally {
      setLoading(false)
    }
  }, [session?.user.id, pwd, pushMessage])

  return (
    <div className="w-full h-full flex flex-col gap-2">
      <div className="grow flex flex-col gap-2 items-center">
        <UserAvatar />
        <p className="w-full text-center">
          <UserEmail />
        </p>
      </div>
      <div className="w-[calc(100%-2rem)] mx-4">
        <StrengthMeter value={passwordStrength(pwd)} />
      </div>
      <div className="w-full input rounded-box !border-none !outline-none bg-base-200 flex flex-row items-center gap-4">
        <label className="swap">
          <input
            type="checkbox"
            checked={hidden}
            onChange={(e) => setHidden(e.target.checked)}
          />
          <EyeOff className="swap-on w-4 h-4" />
          <Eye className="swap-off w-4 h-4" />
        </label>
        <input
          placeholder="Set your password"
          type={hidden ? 'password' : 'text'}
          className="grow text-sm"
          value={pwd}
          onChange={(e) => setPwd(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && onSubmit()}
          autoFocus
        />
        <button
          className="btn btn-sm btn-primary btn-square -mx-2"
          onClick={onSubmit}
          disabled={!pwd || loading}
        >
          <ArrowRight className={clsx('w-4 h-4', { hidden: loading })} />
          <span
            className={clsx('loading loading-spinner loading-xs', {
              hidden: !loading,
            })}
          />
        </button>
      </div>
      <p
        className="w-full mt-2 text-center opacity-60 cursor-pointer hover:underline flex flex-row gap-2 justify-center items-center text-xs"
        onClick={signOut}
      >
        Use another account
      </p>
    </div>
  )
}
