import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import Link from "next/link";
import { getLogoutRoute, getTodosRoute } from "@/lib/routes";
import "./globals.css";
import Logo from "@/components/icons/Logo";
import ThemeManager from "@/components/ThemeManager";

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
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <UserProvider>
      <html lang="en">
        <body className={`${dmSans.className} bg-background text-text`}>
          <div className="h-screen flex flex-col">
            <header className="flex h-14 items-center border-b px-4">
              <Link
                className="flex items-center gap-2 font-semibold"
                href={getTodosRoute()}
              >
                <Logo />
                <span className="">mindfulmemos</span>
              </Link>
              <a href={getLogoutRoute()} className="block ml-auto">
                Logout
              </a>
            </header>

            <div className="flex flex-1 p-4">{children}</div>
          </div>
          <ThemeManager />
          <SpeedInsights />
        </body>
      </html>
    </UserProvider>
  );
}
