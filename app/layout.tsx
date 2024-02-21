import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import Link from "next/link";
import "./globals.css";
import ThemeManager from "@/components/ThemeManager";
import { Bars3Icon, PlusCircleIcon } from "@heroicons/react/24/outline";
import { getTasksRoute } from "@/lib/routes";

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
        <body className={`${dmSans.className} bg-background-50 text-text-950`}>
          <div className="flex h-screen flex-col">
            <header className="fixed top-0 z-40 flex h-16 min-h-16 w-full items-center justify-between bg-background-50 px-8">
              <button>
                <Bars3Icon className="h-7 w-7" />
              </button>
              <Link className="font-semibold" href={getTasksRoute()}>
                mindfulmemos
              </Link>
              <button>
                <PlusCircleIcon className="h-7 w-7" />
              </button>
            </header>

            <div className="mt-16 flex flex-1">{children}</div>
          </div>
          <ThemeManager />
        </body>
      </html>
    </UserProvider>
  );
}
