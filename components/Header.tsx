import { getTasksRoute } from "@/lib/routes";
import Link from "next/link";
import React from "react";
import HeaderDropdown from "./HeaderDropdown";
import HeaderSidebar from "./HeaderSidebar";
import { createClient } from "@/lib/supabase/server";
import clsx from "clsx";

export default async function Header() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isAuthenticated = user?.role === "authenticated";

  return (
    <header
      className={clsx(
        "fixed top-0 z-30 flex h-16 min-h-16 w-full items-center bg-background-50 px-8",
        isAuthenticated ? "justify-between" : "justify-center",
      )}
    >
      {isAuthenticated && <HeaderSidebar />}
      <Link className="font-semibold" href={getTasksRoute()}>
        mindfulmemos
      </Link>
      {isAuthenticated && <HeaderDropdown />}
    </header>
  );
}
