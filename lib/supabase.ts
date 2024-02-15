import { createClient as createSupabaseClient } from "@supabase/supabase-js";

const createClient = (access_token: string) => {
  const options = {};

  if (access_token) {
    // @ts-ignore
    options.global = {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    };
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) throw new Error("Missing Supabase URL or Key");

  const supabase = createSupabaseClient(url, key, options);

  return supabase;
};

export { createClient };
