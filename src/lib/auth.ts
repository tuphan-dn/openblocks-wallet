import { useAsync } from 'react-use'
import { Vault } from './vault'
import { supabase } from './supabase'
import type { AuthRequest } from '~background/messages/auth'
import { sendToBackground } from '@plasmohq/messaging'

export const getSession = async () => {
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession()
  if (error) return null
  return session
}

export const useSession = () => {
  const { value: session } = useAsync(getSession, [])
  return session || undefined
}

export const signIn = async (
  body: AuthRequest,
): Promise<{ url?: string } | string> => {
  return await sendToBackground({ name: 'auth', body })
}

export const signOut = async (pwd?: string) => {
  const session = await getSession()
  if (!session) throw new Error('Session ended')
  const vault = new Vault(session)
  await vault.remove(pwd)
  await supabase.auth.signOut()
  location.reload()
}
