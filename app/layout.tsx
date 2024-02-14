import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import "./globals.css";
import Link from "next/link";
import CheckCircleIcon from "@/components/icons/CheckCircleIcon";
import { getLogoutRoute, getTodosRoute } from "@/lib/routes";

const poppins = Poppins({
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
    <html lang="en">
      <UserProvider>
        <body className={poppins.className}>
          <div className="h-screen flex flex-col">
            <header className="flex h-14 items-center border-b px-4">
              <Link
                className="flex items-center gap-2 font-semibold"
                href={getTodosRoute()}
              >
                <CheckCircleIcon />
                <span className="">MindfulMemos</span>
              </Link>
              <a href={getLogoutRoute()} className="block ml-auto">
                Logout
              </a>
            </header>

            {children}
          </div>
          <SpeedInsights />
        </body>
      </UserProvider>
    </html>
  );
}
