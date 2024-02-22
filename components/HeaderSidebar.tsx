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
import { getUsersName } from "@/lib/utils";
import { getLogoutRoute } from "@/lib/routes";
import { Transition } from "@headlessui/react";
import { useUser } from "@/lib/hooks";

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
  const user = useUser();

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
                {getUsersName(user)}
              </h2>
              <Link href="/" className="text-sm text-accent-500">
                View account
              </Link>
            </section>

            <nav className="flex w-full flex-1 flex-col justify-between">
              <div className="flex flex-col items-start">
                <NavItem href="/">
                  <IconWrapper>
                    <MagnifyingGlassIcon />
                  </IconWrapper>
                  <span>Search</span>
                </NavItem>
                <NavItem href="/">
                  <IconWrapper>
                    <ClipboardIcon />
                  </IconWrapper>
                  <span>Tasks</span>
                </NavItem>
                <NavItem href="/">
                  <IconWrapper>
                    <CloudIcon />
                  </IconWrapper>
                  <span>Thoughts</span>
                </NavItem>
                <NavItem href="/">
                  <IconWrapper>
                    <ListBulletIcon />
                  </IconWrapper>
                  <span>Categories</span>
                </NavItem>
                <NavItem asButton>
                  <IconWrapper>
                    <MoonIcon />
                  </IconWrapper>
                  <span>Theme</span>
                </NavItem>
              </div>

              <NavItem href={getLogoutRoute()}>
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
            className="bg-background-900/25 fixed left-0 top-0 z-40 h-screen w-screen"
          />
        </Transition.Child>
      </div>
    </Transition>
  );
}

type NavItemProps = {
  href?: string;
  children: React.ReactNode;
  asButton?: boolean;
};

function NavItem({ href, children, asButton }: NavItemProps) {
  const classes =
    "flex w-full gap-4 px-6 py-2 text-base font-bold hover:bg-background-100 focus:bg-background-100 active:bg-background-100";

  return asButton || !href ? (
    <button className={classes}>{children}</button>
  ) : (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}

function IconWrapper({ children }: { children: React.ReactNode }) {
  return <div className="h-6 w-6">{children}</div>;
}
