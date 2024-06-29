import 'https://esm.sh/@supabase/functions-js/src/edge-runtime.d.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

Deno.serve(async (req: Request) => {
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
    const { id, secret }: { id: string; secret: string } = await req.json()
    const data = await sbc
      .from('secret_shares')
      .insert({
        id,
        secret,
        updated_at: new Date(),
      })
      .select()
    return new Response(JSON.stringify(data), {
      headers: { 'Content-Type': 'application/json' },
    })
  }
  // PATCH
  if (req.method === 'PATCH') {
    const { secret }: { secret: string } = await req.json()
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
})
