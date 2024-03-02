"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuItemIconWrapper,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import { getAccountRoute, getLoginRoute, getLogoutRoute } from "@/lib/routes";
import Link from "next/link";
import { useTheme } from "@/lib/hooks/client";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import UserImage from "@/components/ui/UserImage";
import {
  ArrowLeftStartOnRectangleIcon,
  MoonIcon,
  SunIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { revalidatePath } from "next/cache";

export default function HeaderDropdown() {
  const router = useRouter();
  const [theme, setTheme] = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserImage />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem asChild>
          <Link href={getAccountRoute()}>
            <DropdownMenuItemIconWrapper>
              <UserCircleIcon />
            </DropdownMenuItemIconWrapper>
            <p>My account</p>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            setTheme(theme === "dark" ? "light" : "dark");
          }}
        >
          <DropdownMenuItemIconWrapper>
            {theme === "dark" ? <MoonIcon /> : <SunIcon />}
          </DropdownMenuItemIconWrapper>
          <p>Change theme</p>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link
            href={getLogoutRoute()}
            onClick={() => revalidatePath("/", "layout")}
          >
            <DropdownMenuItemIconWrapper>
              <ArrowLeftStartOnRectangleIcon />
            </DropdownMenuItemIconWrapper>
            <p>Sign out</p>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
