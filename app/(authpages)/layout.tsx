"use client";

import { usePathname } from "next/navigation";
import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const pageName = pathname.slice(1);
  const pageCopy = getPageCopy((pageName as Page) || undefined);

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <section className="mb-10 flex flex-col items-center text-center">
        <h1 className="mb-2 text-3xl font-bold">{pageCopy.title}</h1>
        <p className="text-text-900/60 w-11/12">{pageCopy.description}</p>
      </section>

      <section className="w-full">{children}</section>
    </div>
  );
}

type Page = "signin" | "signup" | "forgotpassword" | "passwordreset";

type PageCopy = {
  title: string;
  description: string;
};

function getPageCopy(page?: Page): PageCopy {
  switch (page) {
    case "signin":
      return {
        title: "Login",
        description: "Welcome back! Enter your email and password to sign in.",
      };

    case "signup":
      return {
        title: "Sign up",
        description: "Let's get your account created and logged in!",
      };

    case "forgotpassword":
      return {
        title: "Forgot password",
        description: "Enter your email to receive a password reset link.",
      };

    case "passwordreset":
      return {
        title: "Reset password",
        description: "Enter your new password and verify it to continue.",
      };

    default:
      return {
        title: "How'd you get here?",
        description: "You shouldn't be here.",
      };
  }
}
