import { Database } from "@/types";
import { createBrowserClient, createServerClient } from "@supabase/ssr";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

export const useSupabase = (cookieStore?: ReadonlyRequestCookies) => {
  const supabaseServerClient = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore?.get(name)?.value;
        },
        set(name: string, value: string) {
          cookieStore?.set(name, value);
        },
        remove(name: string) {
          cookieStore?.delete(name);
        },
      },
    },
  );

  const supabaseBrowserClient = createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );

  return { supabaseServerClient, supabaseBrowserClient };
};
