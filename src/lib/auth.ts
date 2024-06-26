import { useAsync } from 'react-use'
import { Password } from './password'
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

export const signOut = async () => {
  const session = await getSession()
  if (!session) return
  await supabase.auth.signOut()
  const password = new Password(session.user.id)
  await password.set()
  location.reload()
}
