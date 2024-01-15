import "./globals.css";
import type { Metadata } from "next";
import { Inter, Russo_One } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import Navbar from "../components/Navbar/Navbar";

const inter = Inter({
  weight: "variable",
  subsets: ["latin"],
  display: "swap",
});

export const russo = Russo_One({
  weight: "400",
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sportly",
  description: "Created by Zach Salvaggio",
  icons: {
    icon: `/favicon.ico`,
    apple: `/apple-touch-icon.png`,
    shortcut: `/apple-touch-icon.png`,
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
