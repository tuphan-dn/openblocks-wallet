import { z } from 'zod'
import { factory } from '~background/factory'
import { supabase } from '~lib/supabase'
import { openWindow } from '~lib/tunnel'

export enum AuthType {
  OTP = 'otp',
  OAuth = 'oauth',
  IdToken = 'id_token',
}

export enum AuthProvider {
  Apple = 'apple',
  Facebook = 'facebook',
  Github = 'github',
  Twitter = 'twitter',
}

export const AuthRequestDto = z.union([
  z.object({
    type: z.literal(AuthType.OTP),
    email: z.string().email(),
  }),
  z.object({
    type: z.literal(AuthType.OAuth),
    provider: z.nativeEnum(AuthProvider),
  }),
  z.object({
    type: z.literal(AuthType.IdToken),
  }),
])
export type AuthRequest = z.infer<typeof AuthRequestDto>

export const AuthResponseDto = z.object({
  url: z.string().optional(),
})
export type AuthResponse = z.infer<typeof AuthResponseDto>

const handler = factory(AuthRequestDto, AuthResponseDto, async ({ body }) => {
  // Signin with OTP
  if (body.type === AuthType.OTP) {
    await supabase.auth.signInWithOtp({ email: body.email })
    return {}
  }
  // Sign in with OAuth
  if (body.type === AuthType.OAuth) {
    const {
      data: { url },
    } = await supabase.auth.signInWithOAuth({
      provider: body.provider,
      options: {
        scopes: 'email',
        redirectTo: `chrome-extension://${chrome.runtime.id}/popup.html`,
        skipBrowserRedirect: true,
      },
    })
    if (!url) throw new Error('Cannot complete the signin flow')
    return { url }
  }
  // Sign in with id_token
  if (body.type === AuthType.IdToken) {
    const manifest = chrome.runtime.getManifest()
    const url = new URL('https://accounts.google.com/o/oauth2/auth')
    const oauth2 = manifest.oauth2
    if (!oauth2)
      throw new Error('Invalid Chrome extension OAuth2 configuration')
    url.searchParams.set('client_id', oauth2.client_id)
    url.searchParams.set('response_type', 'id_token')
    url.searchParams.set('access_type', 'offline')
    url.searchParams.set(
      'redirect_uri',
      `https://${chrome.runtime.id}.chromiumapp.org`,
    )
    url.searchParams.set('scope', (oauth2.scopes || []).join(' '))
    const redirectedTo = await chrome.identity.launchWebAuthFlow({
      url: url.href,
      interactive: true,
    })
    const err = 'Expected errors occurred while signin.'
    if (chrome.runtime.lastError || !redirectedTo)
      throw new Error(chrome.runtime.lastError?.message || err)
    const params = new URLSearchParams(new URL(redirectedTo).hash)
    const token = params.get('#id_token')
    if (!token) throw new Error(err)
    const { error } = await supabase.auth.signInWithIdToken({
      provider: 'google',
      token,
    })
    if (error) throw new Error(error.message || err)
    const id = await openWindow('/popup.html')
    if (!id) throw new Error('Cannot complete the signin flow')
    const tab = await chrome.tabs.get(id)
    return { url: tab.url }
  }
  throw new Error('Invalid signin method')
})
export default handler
