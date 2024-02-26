import { createClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

export function useUser() {
  const [user, setUser] = useState<User | undefined>();

  useEffect(() => {
    async function getUser() {
      const supabase = createClient();
      const { data } = await supabase.auth.getSession();
      setUser(data.session?.user ?? undefined);
    }
    if (!user) getUser();
  }, [user]);

  return user;
}
