"use client";

// import Sun from "@/app/components/svgs/Sun";
// import Moon from "@/app/components/svgs/Moon";
import { useEffect, useState } from "react";

type theme = "light" | "dark";

export default function ThemeManager() {
  const [theme, setTheme] = useState<theme>("light");

  useEffect(() => {
    const matchesDarkMode =
      window.localStorage.theme === "dark" ||
      (!("theme" in window.localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);

    if (matchesDarkMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [theme]);

  // TODO: Implement action to toggle theme
  return null;
  // return (
  //   <button type="button" className="p-3 border-2 border-accent rounded-lg" onClick={toggleTheme}>
  //     {theme === 'dark' ? <Moon /> : <Sun />}
  //   </button>
  // );

  function toggleTheme() {
    if (window.localStorage.theme === "dark") {
      window.localStorage.theme = "light";
      setTheme("light");
    } else {
      window.localStorage.theme = "dark";
      setTheme("dark");
    }
  }
}
