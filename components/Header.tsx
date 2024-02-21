import { getTasksRoute } from "@/lib/routes";
import { Bars3Icon } from "@heroicons/react/24/outline";
import Link from "next/link";
import React from "react";
import HeaderDropdown from "./HeaderDropdown";

export default function Header() {
  return (
    <header className="fixed top-0 z-40 flex h-16 min-h-16 w-full items-center justify-between bg-background-50 px-8">
      <button>
        <Bars3Icon className="h-7 w-7" />
      </button>
      <Link className="font-semibold" href={getTasksRoute()}>
        mindfulmemos
      </Link>
      <HeaderDropdown />
    </header>
  );
}
