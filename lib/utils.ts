import { User } from "@supabase/supabase-js";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getUsersFirstName(user?: User): string | null {
  return user?.user_metadata.first_name ?? null;
}

export function getUsersFullName(user?: User): string | null {
  const firstName = user?.user_metadata.first_name;
  const lastName = user?.user_metadata.last_name;
  return `${firstName} ${lastName}` ?? null;
}

export function getUsersInitials(user?: User): string | null {
  const firstInitial = user?.user_metadata.first_name.charAt(0);
  const lastInitial = user?.user_metadata.last_name.charAt(0);
  const initials = `${firstInitial}${lastInitial}`;
  return firstInitial && lastInitial ? initials : "MM";
}

export function getUsersProfileImage(user?: User): string | null {
  return user?.user_metadata.image ?? null;
}
