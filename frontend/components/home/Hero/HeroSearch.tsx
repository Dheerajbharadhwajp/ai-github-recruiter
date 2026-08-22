"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function HeroSearch() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isNavigating, setIsNavigating] = useState(false);

  function handleAnalyze() {
    const trimmed = username.trim();
    if (!trimmed) {
      setError("Please enter a GitHub username.");
      return;
    }
    setError(null);
    setIsNavigating(true);
    router.push(`/dashboard/${encodeURIComponent(trimmed)}`);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      handleAnalyze();
    }
  }

  return (
    <div className="flex w-full max-w-2xl flex-col items-center gap-2">
      <div className="flex w-full items-center gap-3">
        <Input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter GitHub username..."
          className="h-12 rounded-xl border-zinc-700 bg-zinc-900 text-white placeholder:text-zinc-500"
        />

        <Button
          onClick={handleAnalyze}
          disabled={isNavigating}
          className="h-12 rounded-xl bg-blue-600 px-6 hover:bg-blue-500"
        >
          {isNavigating ? (
            <>
              Analyzing...
              <Loader2 className="ml-2 h-4 w-4 animate-spin" />
            </>
          ) : (
            <>
              Analyze
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
