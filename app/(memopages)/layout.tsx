"use client";

import React from "react";
import Link from "next/link";
import { getTasksRoute, getThoughtsRoute } from "@/lib/routes";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { NewItemButton } from "@/app/(memopages)/NewItemButton";

type Props = {
  children: React.ReactNode;
};

// TODO: Implement loading skeleton
export default function PagesLayout({ children }: Props) {
  const pathname = usePathname();
  const tasksRoute = getTasksRoute();
  const thoughtsRoute = getThoughtsRoute();

  return (
    <main className="relative flex flex-1 flex-col gap-4 pt-4">
      <nav className="relative flex gap-4 border-b-0">
        <Tab active={pathname === tasksRoute} href={tasksRoute}>
          Tasks
        </Tab>
        <Tab active={pathname === thoughtsRoute} href={thoughtsRoute}>
          Thoughts
        </Tab>
        <div
          className={clsx(
            "h-full w-1/2 rounded-lg bg-popover-foreground px-2 py-1.5",
            "absolute left-0 top-0 -z-10 transition-transform",
            pathname === thoughtsRoute ? "translate-x-full" : "",
          )}
        />
      </nav>

      <section className="flex-1">{children}</section>

      <NewItemButton itemType={pathname === tasksRoute ? "task" : "thought"} />
    </main>
  );
}

type TabProps = {
  href: string;
  children: React.ReactNode;
  active?: boolean;
};

function Tab({ href, children, active }: TabProps) {
  return (
    <Link
      className={clsx(
        "flex-1 rounded-lg px-2 py-2 text-center text-xl font-semibold transition-colors",
        active ? "text-background" : "",
      )}
      href={href}
    >
      {children}
    </Link>
  );
}
