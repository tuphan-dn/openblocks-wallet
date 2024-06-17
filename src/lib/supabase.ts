import { createClient } from '@supabase/supabase-js'
import { Storage } from '@plasmohq/storage'

class SupportedStorage {
  private storage: Storage
  constructor(...args: ConstructorParameters<typeof Storage>) {
    this.storage = new Storage(...args)
  }

  getItem = async (key: string): Promise<string | null> => {
    const re = await this.storage.getItem(key)
    return re || null
  }

  setItem = async (key: string, rawValue: any): Promise<void> => {
    return await this.storage.setItem(key, rawValue)
  }

  removeItem = async (key: string): Promise<void> => {
    return await this.storage.removeItem(key)
  }
}

const storage = new SupportedStorage({
  area: 'local',
})

export const supabase = createClient(
  process.env.PLASMO_PUBLIC_SUPABASE_URL || '',
  process.env.PLASMO_PUBLIC_SUPABASE_KEY || '',
  {
    auth: {
      storage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
    },
  },
)

export const getSession = async () => {
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession()
  if (error) return null
  return session
}
