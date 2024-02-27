import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "@/app/globals.css";
import { useUser } from "@/lib/hooks/server";
import clsx from "clsx";
import { getTasksRoute } from "@/lib/routes";
import Link from "next/link";
import HeaderDropdown from "@/components/HeaderDropdown";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "800"],
});

export const metadata: Metadata = {
  title: "MindfulMemos",
  description:
    "A place to keep all of your excess thoughts and tasks so they don't cloud up your mind.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await useUser();

  const isAuthenticated = user?.role === "authenticated";

  return (
    <html lang="en">
      <body className={`${dmSans.className} text-foreground bg-background`}>
        <div className="flex h-screen w-full flex-col px-4 pb-6">
          <header
            className={clsx(
              "fixed left-0 top-0 z-30 flex h-16 min-h-16 w-full flex-1 items-center bg-background-50 px-4",
              isAuthenticated ? "justify-between" : "justify-center",
            )}
          >
            <Link className="font-semibold" href={getTasksRoute()}>
              mindfulmemos
            </Link>
            {isAuthenticated && <HeaderDropdown />}
          </header>

          <div className="mt-16 flex flex-1">{children}</div>
        </div>
      </body>
    </html>
  );
}
