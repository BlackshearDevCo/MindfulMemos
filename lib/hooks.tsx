import { useSession } from "next-auth/react";
import { auth } from "@/lib/auth";

export function useUser() {
  const { data } = useSession();
  return data?.user;
}

export async function useUserServer() {
  const session = await auth();
  return session?.user;
}
