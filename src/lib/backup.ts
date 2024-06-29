import axios from 'axios'

export class Backup {
  public readonly url =
    'https://wkktjwtivwbkjnjyfwxb.supabase.co/functions/v1/secret-share'
  constructor(public readonly token: string) {}

  get = async () => {
    const {
      data: { data, error },
    } = await axios.get<EdgeResponse<SecretShare[]>>(
      'https://wkktjwtivwbkjnjyfwxb.supabase.co/functions/v1/secret-share',
      {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      },
    )
    if (error) throw new Error(error.message)
    return data
  }

  post = async (pubkey: string, cloudshare: string) => {
    const {
      data: { data, error },
    } = await axios.post<EdgeResponse<SecretShare[]>>(
      'https://wkktjwtivwbkjnjyfwxb.supabase.co/functions/v1/secret-share',
      {
        id: pubkey,
        secret: cloudshare,
      },
      {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      },
    )
    if (error) throw new Error(error.message)
    return data
  }

  patch = async (cloudshare: string) => {
    const {
      data: { data, error },
    } = await axios.patch<EdgeResponse<SecretShare[]>>(
      'https://wkktjwtivwbkjnjyfwxb.supabase.co/functions/v1/secret-share',
      {
        secret: cloudshare,
      },
      {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      },
    )
    if (error) throw new Error(error.message)
    return data
  }

  delete = async () => {
    // TODO
  }
}
