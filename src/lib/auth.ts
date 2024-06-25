import type { Provider } from '@supabase/supabase-js'
import Password from './password'
import { supabase } from './supabase'

export const getSession = async () => {
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession()
  if (error) return null
  return session
}

type SignInParams = { provider: Provider; scopes?: string } | { email: string }

export const signIn = async (args: SignInParams) => {
  if ('email' in args) {
    await supabase.auth.signInWithOtp({ email: args.email })
    return null
  }
  if ('provider' in args) {
    const {
      data: { url },
    } = await supabase.auth.signInWithOAuth({
      provider: args.provider,
      options: {
        scopes: args.scopes || 'email',
        redirectTo: location.href.replace(/(#+)$/g, ''),
        skipBrowserRedirect: true,
      },
    })
    return url
  }
  throw new Error('Invalid signin parameters')
}

export const signOut = async () => {
  const session = await getSession()
  if (session) {
    await supabase.auth.signOut()
    const password = new Password(session.user.id)
    await password.set()
    location.reload()
  }
}
