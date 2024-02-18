"use client";

import React from "react";
import Link from "next/link";
import { getNewMemoRoute, getThoughtsRoute, getTodosRoute } from "@/lib/routes";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import PlusIcon from "@/components/icons/PlusIcon";

type Props = {
  children: React.ReactNode;
  modal: React.ReactNode;
};

export default function PagesLayout({ children, modal }: Props) {
  const pathname = usePathname();

  const todosRoute = getTodosRoute();
  const thoughtsRoute = getThoughtsRoute();

  return (
    <main className="flex-1 flex flex-col gap-4 relative">
      <nav className="border-b-0 flex gap-4 relative">
        <Tab href={todosRoute}>Todos</Tab>
        <Tab href={thoughtsRoute}>Thoughts</Tab>
        <div
          className={clsx(
            "w-1/2 h-full bg-black/25 rounded-lg px-2 py-1.5",
            "absolute left-0 top-0 -z-10 transition-transform",
            pathname === thoughtsRoute ? "translate-x-full" : ""
          )}
        />
      </nav>

      <div>{modal}</div>
      <div>{children}</div>

      <Link
        href={getNewMemoRoute()}
        className="w-16 h-16 flex justify-center items-center bg-secondary border-2 border-accent rounded-full absolute bottom-4 right-4"
      >
        <PlusIcon />
      </Link>
    </main>
  );
}

type TabProps = {
  href: string;
  children: React.ReactNode;
};

function Tab({ href, children }: TabProps) {
  return (
    <Link
      className="flex-1 text-lg font-semibold text-center rounded-lg px-2 py-1.5"
      href={href}
    >
      {children}
    </Link>
  );
}
