import 'https://esm.sh/@supabase/functions-js/src/edge-runtime.d.ts'

Deno.serve(() => {
  return new Response('OK', { headers: { 'Content-Type': 'application/json' } })
})
