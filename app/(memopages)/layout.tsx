"use client";

import React from "react";
import Link from "next/link";
import { getTasksRoute, getThoughtsRoute } from "@/lib/routes";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import Button from "@/components/ui/OldButton";
import UserImage from "@/components/ui/UserImage";

const TASKS_PROMPT = "What do you want to accomplish?";
const THOUGHTS_PROMPT = "What's on your mind today?";

type Props = {
  children: React.ReactNode;
};

// TODO: Implement loading skeleton
export default function PagesLayout({ children }: Props) {
  const pathname = usePathname();
  const tasksRoute = getTasksRoute();
  const thoughtsRoute = getThoughtsRoute();

  const isTasksRoute = pathname === tasksRoute;

  return (
    <main className="relative flex flex-1 flex-col gap-4 p-8 pt-4">
      <section className="flex flex-col items-center">
        <div className="mb-4">
          <UserImage />
        </div>

        <h2 className="mb-1 text-2xl font-bold">Hey there!</h2>

        <p className="text-sm">
          {isTasksRoute ? TASKS_PROMPT : THOUGHTS_PROMPT}
        </p>
      </section>

      <nav className="relative flex gap-4 border-b-0">
        <Tab active={pathname === tasksRoute} href={tasksRoute}>
          Tasks
        </Tab>
        <Tab active={pathname === thoughtsRoute} href={thoughtsRoute}>
          Thoughts
        </Tab>
        <div
          className={clsx(
            "h-full w-1/2 rounded-lg bg-primary-300 px-2 py-1.5",
            "absolute left-0 top-0 -z-10 transition-transform",
            pathname === thoughtsRoute ? "translate-x-full" : "",
          )}
        />
      </nav>

      <section className="flex-1">{children}</section>

      <Button variant="primaryAccentGradient">
        ADD NEW {isTasksRoute ? "TASK" : "THOUGHT"}
      </Button>
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
        "flex-1 rounded-lg px-2 py-1.5 text-center text-lg font-semibold",
        active ? "text-text-900" : "text-text-800",
      )}
      href={href}
    >
      {children}
    </Link>
  );
}
