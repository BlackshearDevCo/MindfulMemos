import { UserProfile } from "@auth0/nextjs-auth0/client";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getUsersName(user?: UserProfile) {
  return (
    (user?.given_name as string) ?? user?.name ?? user?.nickname ?? user?.email
  );
}

export function getUsersFullName(user?: UserProfile) {
  return (
    user?.name ?? user?.nickname ?? (user?.given_name as string) ?? user?.email
  );
}
