"use client";

import {
  ArrowLeftStartOnRectangleIcon,
  Bars3Icon,
  ClipboardIcon,
  CloudIcon,
  ListBulletIcon,
  MagnifyingGlassIcon,
  MoonIcon,
  SunIcon,
} from "@heroicons/react/24/outline";
import React from "react";
import UserImage from "./ui/UserImage";
import Link, { LinkProps } from "next/link";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { getLoginRoute } from "@/lib/routes";
import { getUsersFullName } from "@/lib/utils";
import { useUser } from "@/lib/hooks/client";
import {
  Sheet,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/Sheet";
import { useTheme } from "@/lib/hooks/client";

export default function HeaderSidebar() {
  const router = useRouter();
  const user = useUser();
  const [theme, setTheme] = useTheme();

  return (
    <Sheet>
      <SheetTrigger>
        <Bars3Icon className="h-7 w-7" />
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col p-0 pb-16 pt-8">
        <SheetHeader>
          <SheetTitle className="mb-3 text-center text-base font-bold">
            mindfulmemos
          </SheetTitle>
          <SheetDescription asChild>
            <section className="text-foreground flex flex-col items-center">
              <div className="mb-4 flex justify-center">
                <UserImage />
              </div>
              <h2 className="mb-1 text-center text-2xl font-bold">
                {getUsersFullName(user)}
              </h2>
              <Link href="/" className="text-accent-foreground text-sm">
                View account
              </Link>
            </section>
          </SheetDescription>
        </SheetHeader>

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
            <NavItem
              type="button"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              <IconWrapper>
                {theme === "dark" ? <MoonIcon /> : <SunIcon />}
              </IconWrapper>
              <span>Theme</span>
            </NavItem>
          </div>
          <NavItem
            type="button"
            onClick={async () => {
              const supabase = createClient();
              await supabase.auth.signOut();
              router.push(getLoginRoute());
              router.refresh();
            }}
            aria-label="Sign out"
          >
            <IconWrapper>
              <ArrowLeftStartOnRectangleIcon />
            </IconWrapper>
            <span>Sign out</span>
          </NavItem>
        </nav>
      </SheetContent>
    </Sheet>
  );
}

type ButtonNavItem = {
  type: "button";
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

type LinkNavItem = {
  type: "link";
  children: React.ReactNode;
} & LinkProps;

type NavItemProps = ButtonNavItem | LinkNavItem;

function NavItem(props: NavItemProps) {
  const { children, type } = props;
  const classes =
    "flex w-full gap-4 px-6 py-2 text-base font-bold hover:bg-muted focus:bg-muted active:bg-muted";

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
