"use client";

import React from "react";
import Link from "next/link";
import { getTasksRoute, getThoughtsRoute } from "@/lib/routes";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import NewTaskButton from "@/components/NewTaskButton";

type Props = {
  children: React.ReactNode;
};

// TODO: Implement loading skeleton
export default function PagesLayout({ children }: Props) {
  const pathname = usePathname();
  const tasksRoute = getTasksRoute();
  const thoughtsRoute = getThoughtsRoute();

  return (
    <main className="relative flex flex-1 flex-col gap-4 p-8 pt-4">
      <nav className="relative flex gap-4 border-b-0">
        <Tab active={pathname === tasksRoute} href={tasksRoute}>
          Tasks
        </Tab>
        <Tab active={pathname === thoughtsRoute} href={thoughtsRoute}>
          Thoughts
        </Tab>
        <div
          className={clsx(
            "bg-popover-foreground h-full w-1/2 rounded-lg px-2 py-1.5",
            "absolute left-0 top-0 -z-10 transition-transform",
            pathname === thoughtsRoute ? "translate-x-full" : "",
          )}
        />
      </nav>

      <section className="flex-1">{children}</section>

      <NewTaskButton />
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
        "flex-1 rounded-lg px-2 py-1.5 text-center text-lg font-semibold transition-colors",
        active ? "text-background" : "",
      )}
      href={href}
    >
      {children}
    </Link>
  );
}
