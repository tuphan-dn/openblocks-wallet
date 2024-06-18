import type { Provider } from '@supabase/supabase-js'
import { unset } from './password'
import { supabase } from './supabase'

export const getSession = async () => {
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession()
  if (error) return null
  return session
}

export const signIn = async (provider: Provider, scopes = 'email') => {
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
  return url
}

export const signOut = async () => {
  await supabase.auth.signOut()
  await unset()
  location.reload()
}