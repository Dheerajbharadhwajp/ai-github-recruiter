import { Bot } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
export default function Navbar() {
  return(
    <nav className="flex items-center justify-between px-8 py-4">
      <div className="flex items-center gap-2">
        <Bot className="h-6 w-6 text-blue-500" />
        <h1 className="text-xl font-bold">GitHire AI</h1>
      </div>

      <div className="flex items-center gap-8">
        <Link href="/" className="hover:text-blue-500 transition-colors">
          Home
        </Link>

        <Link href="/dashboard" className="hover:text-blue-500 transition-colors">
          Dashboard
        </Link>

        <Link href="/docs" className="hover:text-blue-500 transition-colors">
          Docs
        </Link>
      </div>

      <div className="flex items-center gap-4">
        <Button variant="outline" className="hover:bg-purple-950 hover:text-white transition-colors">
          GitHub
        </Button>

        <Button className="hover:bg-purple-950 hover:text-white transition-colors">
          Analyze
        </Button>
      </div>
    </nav>
  );
}

