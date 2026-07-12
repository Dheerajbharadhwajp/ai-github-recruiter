import Link from "next/link";
import { Bot, FolderGit2, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-800/50 bg-zinc-950/80 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="rounded-xl bg-blue-600 p-2">
            <Bot className="h-5 w-5 text-white" />
          </div>

          <div>
            <h1 className="text-lg font-bold tracking-tight text-white">
              GitHire AI
            </h1>

            <p className="text-xs text-zinc-400">
              Find Exceptional Developers with AI
            </p>
          </div>
        </Link>

        {/* Navigation */}
        <div className="hidden items-center gap-8 md:flex">

          <Link
            href="/"
            className="text-sm font-medium text-zinc-300 transition-colors hover:text-white"
          >
            Home
          </Link>

          <Link
            href="/dashboard"
            className="text-sm font-medium text-zinc-300 transition-colors hover:text-white"
          >
            Dashboard
          </Link>

          <Link
            href="/docs"
            className="text-sm font-medium text-zinc-300 transition-colors hover:text-white"
          >
            Docs
          </Link>

          <Link
            href="/about"
            className="text-sm font-medium text-zinc-300 transition-colors hover:text-white"
          >
            About
          </Link>

        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">

          <Button variant="ghost" className="hidden md:flex">
            <FolderGit2 className="mr-2 h-4 w-4" />
            Repository
          </Button>

          <Button className="gap-2 rounded-xl bg-blue-600 hover:bg-blue-500">
            Analyze
            <ArrowRight className="h-4 w-4" />
          </Button>

        </div>

      </nav>
    </header>
  );
}