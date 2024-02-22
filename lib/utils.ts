import { type ClassValue, clsx } from "clsx";
import { User } from "next-auth";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getUsersName(user?: User) {
  return user?.name ?? user?.email ?? "User";
}
