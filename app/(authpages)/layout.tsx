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
  const pageCopy = routesCopy[pageName];

  if (!pageCopy) throw new Error("Page copy not found");

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <section className="mb-10 flex flex-col items-center text-center">
        <h1 className="mb-2 text-3xl font-bold">{pageCopy.title}</h1>
        <p className="w-11/12 text-text-900/60">{pageCopy.description}</p>
      </section>

      <section className="w-full">{children}</section>
    </div>
  );
}

type PageCopy = {
  [path: string]: {
    title: string;
    description: string;
  };
};

const routesCopy: PageCopy = {
  signin: {
    title: "Login",
    description: "Welcome back! Enter your email and password to sign in.",
  },
  signup: {
    title: "Sign up",
    description: "Let's get your account created and logged in!",
  },
};
