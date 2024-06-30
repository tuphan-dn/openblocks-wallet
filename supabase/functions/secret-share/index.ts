import 'https://esm.sh/@supabase/functions-js/src/edge-runtime.d.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { z } from 'https://deno.land/x/zod@v3.23.8/mod.ts'
import { fromError, isZodErrorLike } from 'npm:zod-validation-error@3.3.0'
import { decode } from 'https://deno.land/std@0.170.0/encoding/base58.ts'

function isBase58(str: string) {
  try {
    if (!str || !decode(str)) return false
    return true
  } catch {
    return false
  }
}

Deno.serve(
  {
    onError: (e) => {
      let err = 'Internal Server Error'
      if (isZodErrorLike(e)) err = fromError(e).toString()
      return new Response(err, { status: 500 })
    },
  },
  async (req: Request) => {
    // RLS
    const Authorization = req.headers.get('Authorization')
    if (!Authorization) throw new Error('Unauthorized')
    const sbc = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: {
            Authorization,
          },
        },
      },
    )
    const user_id = (await sbc.auth.getUser()).data.user?.id
    if (!user_id) throw new Error('Unauthorized')
    // GET
    if (req.method === 'GET') {
      const data = await sbc.from('secret_shares').select('*').limit(1)
      return new Response(JSON.stringify(data), {
        headers: { 'Content-Type': 'application/json' },
      })
    }
    // POST
    if (req.method === 'POST') {
      const body = await req.json()
      const { id, secret } = z
        .object({
          id: z
            .string()
            .refine((e) => isBase58(e), { message: 'Invalid wallet proof' }),
          secret: z
            .string()
            .refine((e) => isBase58(e), { message: 'Invalid secret share' }),
        })
        .parse(body)
      const data = await sbc
        .from('secret_shares')
        .insert({ id, secret, updated_at: new Date() })
        .select()
      return new Response(JSON.stringify(data), {
        headers: { 'Content-Type': 'application/json' },
      })
    }
    // PATCH
    if (req.method === 'PATCH') {
      const body = await req.json()
      const { secret } = z.object({ secret: z.string() }).parse(body)
      const data = await sbc
        .from('secret_shares')
        .update({
          secret,
          updated_at: new Date(),
        })
        .eq('user_id', user_id)
        .select()
      return new Response(JSON.stringify(data), {
        headers: { 'Content-Type': 'application/json' },
      })
    }
    throw new Error('Unupported HTTP method')
  },
)
