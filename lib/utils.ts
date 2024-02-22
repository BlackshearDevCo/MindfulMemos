import { type ClassValue, clsx } from "clsx";
import { User } from "next-auth";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getUsersName(user?: User) {
  return user?.name ?? user?.email ?? "User";
}

export function getUsersInitials(user?: User) {
  const name = user?.name;
  if (!user || !name) return "MM";

  const splitName = name.split(" ");

  if (splitName.length === 1) return splitName.splice(0, 2);

  return splitName
    .map((nameSegment) => nameSegment.charAt(0))
    .join("")
    .slice(0, 2);
}
