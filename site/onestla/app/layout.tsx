import type { Metadata } from "next";

import "./globals.css";
import { Caveat } from "next/font/google";

const caveat = Caveat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-caveat",
});

export const metadata: Metadata = {
  title: "On Est Là",
  description: "Dean Holmes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${caveat.variable}`}>{children}</body>
    </html>
  );
}
