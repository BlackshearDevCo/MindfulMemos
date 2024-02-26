"use client";

import {
  ArrowLeftStartOnRectangleIcon,
  Bars3Icon,
  ClipboardIcon,
  CloudIcon,
  ListBulletIcon,
  MagnifyingGlassIcon,
  MoonIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import React, { useState } from "react";
import UserImage from "./ui/UserImage";
import Link from "next/link";
import { Transition } from "@headlessui/react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function HeaderSidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="">
      <button onClick={() => setIsOpen(true)}>
        <Bars3Icon className="h-7 w-7" />
      </button>

      <Sidebar isOpen={isOpen} closeSidebar={() => setIsOpen(false)} />
    </div>
  );
}

function Sidebar({
  closeSidebar,
  isOpen,
}: {
  closeSidebar: () => void;
  isOpen: boolean;
}) {
  const router = useRouter();
  const sidebarClasses =
    "absolute left-0 top-0 z-50 flex h-screen w-[80vw] flex-col items-center rounded-r-xl bg-background-50 pb-16 pt-8 shadow-lg ring-1 ring-gray-900/5";

  return (
    <Transition show={isOpen}>
      <div>
        <Transition.Child
          className={sidebarClasses}
          enter="transition ease-in-out duration-300"
          enterFrom="-translate-x-full"
          enterTo="translate-x-0"
          leave="transition ease-in-out duration-300"
          leaveFrom="translate-x-0"
          leaveTo="-translate-x-full"
        >
          <div className={sidebarClasses}>
            <button
              onClick={closeSidebar}
              className="absolute right-4 top-4 h-6 w-6 rounded-md focus:bg-text-200"
              tabIndex={0}
            >
              <XMarkIcon />
            </button>

            <section className="mb-3 flex flex-col items-center">
              <h2 className="mb-3 text-center text-base font-bold">
                mindfulmemos
              </h2>
              <div className="mb-4">
                <UserImage />
              </div>
              <h2 className="mb-1 text-center text-2xl font-bold">
                {/* {getUsersName(user)} */}User
              </h2>
              <Link href="/" className="text-sm text-accent-500">
                View account
              </Link>
            </section>

            <nav className="flex w-full flex-1 flex-col justify-between">
              <div className="flex flex-col items-start">
                <NavItem type="link" href="/">
                  <IconWrapper>
                    <MagnifyingGlassIcon />
                  </IconWrapper>
                  <span>Search</span>
                </NavItem>
                <NavItem type="link" href="/">
                  <IconWrapper>
                    <ClipboardIcon />
                  </IconWrapper>
                  <span>Tasks</span>
                </NavItem>
                <NavItem type="link" href="/">
                  <IconWrapper>
                    <CloudIcon />
                  </IconWrapper>
                  <span>Thoughts</span>
                </NavItem>
                <NavItem type="link" href="/">
                  <IconWrapper>
                    <ListBulletIcon />
                  </IconWrapper>
                  <span>Categories</span>
                </NavItem>
                <NavItem type="button" onClick={() => {}}>
                  <IconWrapper>
                    <MoonIcon />
                  </IconWrapper>
                  <span>Theme</span>
                </NavItem>
              </div>

              <NavItem
                type="button"
                onClick={async () => {
                  const supabase = createClient();
                  await supabase.auth.signOut();
                  router.refresh();
                }}
              >
                <IconWrapper>
                  <ArrowLeftStartOnRectangleIcon />
                </IconWrapper>
                <span>Sign out</span>
              </NavItem>
            </nav>
          </div>
        </Transition.Child>

        <Transition.Child
          enter="transition-opacity ease-linear duration-300 fixed left-0 top-0 z-40 h-screen w-screen"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300 fixed left-0 top-0 z-40 h-screen w-screen"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            onClick={closeSidebar}
            className="fixed left-0 top-0 z-40 h-screen w-screen bg-background-900/25"
          />
        </Transition.Child>
      </div>
    </Transition>
  );
}

type ButtonNavItem = {
  type: "button";
  onClick: () => void;
  children: React.ReactNode;
};

type LinkNavItem = {
  type: "link";
  href: string;
  children: React.ReactNode;
};

type NavItemProps = ButtonNavItem | LinkNavItem;

function NavItem(props: NavItemProps) {
  const { children, type } = props;
  const classes =
    "flex w-full gap-4 px-6 py-2 text-base font-bold hover:bg-background-100 focus:bg-background-100 active:bg-background-100";

  switch (type) {
    case "button":
      return (
        <button onClick={props.onClick} className={classes}>
          {children}
        </button>
      );
    case "link":
      return (
        <Link href={props.href} className={classes}>
          {children}
        </Link>
      );
  }
}

function IconWrapper({ children }: { children: React.ReactNode }) {
  return <div className="h-6 w-6">{children}</div>;
}
