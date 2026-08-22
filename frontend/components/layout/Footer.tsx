import Link from "next/link";
import { Bot, FolderGit2 } from "lucide-react";

const links = [
  { href: "/", label: "Home" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/docs", label: "Docs" },
  { href: "/about", label: "About" },
];

export default function Footer() {
  return (
    <footer className="border-t border-zinc-800/50">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-6 py-12 md:flex-row md:justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="rounded-xl bg-blue-600 p-2">
            <Bot className="h-4 w-4 text-white" />
          </div>
          <span className="text-sm font-semibold text-zinc-300">GitHire AI</span>
        </Link>

        <nav className="flex flex-wrap items-center justify-center gap-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-zinc-500 transition-colors hover:text-zinc-300"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-zinc-500 transition-colors hover:text-zinc-300"
          aria-label="GitHub"
        >
          <FolderGit2 className="h-5 w-5" />
        </a>
      </div>

      <p className="border-t border-zinc-800/50 py-6 text-center text-xs text-zinc-600">
        © {new Date().getFullYear()} GitHire AI. All rights reserved.
      </p>
    </footer>
  );
}
