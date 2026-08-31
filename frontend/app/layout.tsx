import type { Metadata } from "next";
import { Lexend, Geist_Mono } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/layout/Navbar";

const lexend = Lexend({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GitHire AI",
  description: "AI-powered GitHub recruiter using multi-agent workflows.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${lexend.variable} ${geistMono.variable} dark h-full antialiased`}
    >
      <body
        className="
          min-h-screen
          bg-zinc-950
          text-zinc-100
          font-sans
          antialiased
        "
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
