import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import Header from "@/components/Header";
import "@/app/globals.css";

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
    <html lang="en">
      <body className={`${dmSans.className} text-foreground bg-background`}>
        <div className="flex h-screen flex-col">
          <Header />

          <div className="mt-16 flex flex-1">{children}</div>
        </div>
      </body>
    </html>
  );
}
