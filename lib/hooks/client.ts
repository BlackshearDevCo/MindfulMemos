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

type Theme = "light" | "dark";
export const useTheme = (): [Theme, (theme: Theme) => void] => {
  const matchesDarkMode =
    window.localStorage.theme === "dark" ||
    (!("theme" in window.localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);
  const [theme, setTheme] = useState<Theme>(matchesDarkMode ? "dark" : "light");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      window.localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      window.localStorage.setItem("theme", "light");
    }
  }, [theme, matchesDarkMode]);

  return [theme, setTheme];
};
