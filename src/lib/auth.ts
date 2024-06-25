import type { Provider } from '@supabase/supabase-js'
import { useAsync } from 'react-use'
import { Password } from './password'
import { supabase } from './supabase'

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

export const signInWithOtp = async (email: string) => {
  const data = await supabase.auth.signInWithOtp({ email })
  return data
}

export const signInWithOAuth = async (provider: Provider, scopes = 'email') => {
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

export const signInWithIdToken = async () => {
  const manifest = chrome.runtime.getManifest()
  const url = new URL('https://accounts.google.com/o/oauth2/auth')
  const oauth2 = manifest.oauth2
  if (!oauth2) throw new Error('Invalid Chrome extension OAuth2 configuration')
  url.searchParams.set('client_id', oauth2.client_id)
  url.searchParams.set('response_type', 'id_token')
  url.searchParams.set('access_type', 'offline')
  url.searchParams.set(
    'redirect_uri',
    `https://${chrome.runtime.id}.chromiumapp.org`,
  )
  url.searchParams.set('scope', (oauth2.scopes || []).join(' '))
  return new Promise((resolve, reject) => {
    chrome.identity.launchWebAuthFlow(
      {
        url: url.href,
        interactive: true,
      },
      async (redirectedTo) => {
        const err = 'Expected errors occurred while signin.'
        if (chrome.runtime.lastError || !redirectedTo)
          return reject(chrome.runtime.lastError?.message || err)
        const url = new URL(redirectedTo)
        const params = new URLSearchParams(url.hash.replace('#', ''))
        const token = params.get('id_token')
        console.log('==================', token)
        if (!token) return reject(err)
        const { data, error } = await supabase.auth.signInWithIdToken({
          provider: 'google',
          token,
        })
        if (error) return reject(error.message || err)
        return resolve(data)
      },
    )
  })
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
