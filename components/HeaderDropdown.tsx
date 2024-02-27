"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import { getAccountRoute, getLoginRoute } from "@/lib/routes";
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

export default function HeaderDropdown() {
  const router = useRouter();
  const [theme, setTheme] = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserImage />
      </DropdownMenuTrigger>
      <DropdownMenuContent sideOffset={8} align="end">
        <DropdownMenuItem className="flex gap-2 hover:cursor-pointer" asChild>
          <Link href={getAccountRoute()}>
            <IconWrapper>
              <UserCircleIcon />
            </IconWrapper>
            <p>My account</p>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex gap-2 hover:cursor-pointer"
          onClick={() => {
            setTheme(theme === "dark" ? "light" : "dark");
          }}
        >
          <IconWrapper>
            {theme === "dark" ? <MoonIcon /> : <SunIcon />}
          </IconWrapper>
          <p>Change theme</p>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex gap-2 hover:cursor-pointer"
          onClick={async () => {
            const supabase = createClient();
            await supabase.auth.signOut();
            router.push(getLoginRoute());
            router.refresh();
          }}
        >
          <IconWrapper>
            <ArrowLeftStartOnRectangleIcon />
          </IconWrapper>
          <p>Sign out</p>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function IconWrapper({ children }: { children: React.ReactNode }) {
  return <div className="h-6 w-6">{children}</div>;
}
