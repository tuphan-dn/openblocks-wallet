import "https://esm.sh/@supabase/functions-js/src/edge-runtime.d.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

Deno.serve(async (req: Request) => {
  // RLS
  const Authorization = req.headers.get("Authorization");
  if (!Authorization) throw new Error("Unauthorized");
  const sbc = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_ANON_KEY") ?? "",
    {
      global: {
        headers: {
          Authorization,
        },
      },
    },
  );
  // GET
  if (req.method === "GET") {
    const data = await sbc.from("secret_shares").select("*");
    return new Response(
      JSON.stringify(data),
      { headers: { "Content-Type": "application/json" } },
    );
  }
  // POST
  if (req.method === "POST") {
    const { secret }: { secret: string } = await req.json();
    const data = await sbc.from("secret_shares").insert({
      secret,
      updated_at: new Date(),
    });
    return new Response(
      JSON.stringify(data),
      { headers: { "Content-Type": "application/json" } },
    );
  }
  throw new Error("Unupported HTTP method");
});
