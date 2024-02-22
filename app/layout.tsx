import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
// import { UserProvider } from "@auth0/nextjs-auth0/client";
import ThemeManager from "@/components/ThemeManager";
import Header from "@/components/Header";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "800"],
});

export const metadata: Metadata = {
  title: "MindfulMemos",
  description:
    "A place to keep all of your excess thoughts and tasks so they don't cloud up your mind.",
};

export default function RootLayout({
  children,
  session,
}: Readonly<{
  children: React.ReactNode;
  session: Session;
}>) {
  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body className={`${dmSans.className} bg-background-50 text-text-950`}>
          <div className="flex h-screen flex-col">
            <Header />

            <div className="mt-16 flex flex-1">{children}</div>
          </div>

          <ThemeManager />
        </body>
      </html>
    </SessionProvider>
  );
}
