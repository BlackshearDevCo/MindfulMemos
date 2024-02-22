import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";

export const authConfig = {
  callbacks: {
    authorized({ auth }) {
      const isLoggedIn = !!auth?.user;
      if (!isLoggedIn) return false;
      return true;
    },
  },
  providers: [Google],
} satisfies NextAuthConfig;
