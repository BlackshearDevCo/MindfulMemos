"use client";

import React from "react";
import Link from "next/link";
import { getThoughtsRoute, getTodosRoute } from "@/lib/routes";
import clsx from "clsx";
import { usePathname } from "next/navigation";

type Props = {
  children: React.ReactNode;
};

export default function PagesLayout({ children }: Props) {
  const pathname = usePathname();

  const todosRoute = getTodosRoute();
  const thoughtsRoute = getThoughtsRoute();

  return (
    <main className="flex-1 flex flex-col gap-4 p-4">
      <div className="border-b-0 flex gap-4">
        <Tab active={pathname === todosRoute} href={todosRoute}>
          Todos
        </Tab>
        <Tab active={pathname === thoughtsRoute} href={thoughtsRoute}>
          Thoughts
        </Tab>
      </div>

      {children}
    </main>
  );
}

type TabProps = {
  href: string;
  children: React.ReactNode;
  active?: boolean;
};

function Tab({ href, active, children }: TabProps) {
  return (
    <Link
      className={clsx(
        "flex-1 text-center rounded-lg px-2 py-2",
        active ? "bg-slate-900" : ""
      )}
      href={href}
    >
      {children}
    </Link>
  );
}
