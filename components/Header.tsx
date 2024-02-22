import { getTasksRoute } from "@/lib/routes";
import Link from "next/link";
import React from "react";
import HeaderDropdown from "./HeaderDropdown";
import HeaderSidebar from "./HeaderSidebar";

export default function Header() {
  return (
    <header className="fixed top-0 z-30 flex h-16 min-h-16 w-full items-center justify-between bg-background-50 px-8">
      <HeaderSidebar />
      <Link className="font-semibold" href={getTasksRoute()}>
        mindfulmemos
      </Link>
      <HeaderDropdown />
    </header>
  );
}
