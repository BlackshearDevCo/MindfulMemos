import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <section className="mb-10 flex flex-col items-center text-center">
        <h1 className="mb-2 text-3xl font-bold">Log In</h1>
        <p className="w-11/12 text-text-900/60">
          Welcome back! Enter your email and password to sign in
        </p>
      </section>

      <section className="w-full">{children}</section>
    </div>
  );
}
