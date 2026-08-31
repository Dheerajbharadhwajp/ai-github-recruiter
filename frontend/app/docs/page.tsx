"use client";

import { useState } from "react";

import Link from "next/link";

import CandidateRoster from "@/components/docs/CandidateRoster";
import ChatPanel from "@/components/docs/ChatPanel";
import RoleScreeningForm from "@/components/docs/RoleScreeningForm";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useCandidates } from "@/hooks/useCandidates";
import { useScreening } from "@/hooks/useScreening";

export default function DocsPage() {
  const { status, candidates, error, reload, reset, setCandidates } = useCandidates();
  const { status: screeningStatus, error: screeningError, screen } = useScreening();
  const [screenedRole, setScreenedRole] = useState<string | null>(null);
  const currentRole = screenedRole ?? candidates.find((c) => c.screening)?.screening?.role ?? null;

  async function handleReset() {
    const confirmed = window.confirm(
      "This will permanently erase every searched candidate and their AI analysis. Continue?"
    );
    if (!confirmed) return;
    await reset();
    setScreenedRole(null);
  }

  async function handleScreen(role: string) {
    const updated = await screen(role);
    if (updated) {
      setCandidates(updated);
      setScreenedRole(role);
    }
  }

  return (
    <main className="mx-auto min-h-screen max-w-5xl px-6 py-16">
      <Link href="/" className="mb-8 inline-block text-sm text-zinc-400 hover:text-white">
        &larr; Back to search
      </Link>

      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white">Candidates</h1>
          <p className="text-zinc-400">Every GitHub profile searched so far.</p>
        </div>
        <Button
          variant="destructive"
          onClick={handleReset}
          disabled={status === "loading" || candidates.length === 0}
        >
          Reset
        </Button>
      </div>

      {status === "loading" && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-28 rounded-2xl" />
          ))}
        </div>
      )}

      {status === "error" && (
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-10 text-center">
          <p className="text-red-500">{error}</p>
          <Button variant="outline" className="mt-4" onClick={reload}>
            Try again
          </Button>
        </div>
      )}

      {status === "success" && (
        <div className="flex flex-col gap-6">
          <RoleScreeningForm onSubmit={handleScreen} loading={screeningStatus === "loading"} />
          {screeningError && <p className="text-sm text-red-500">{screeningError}</p>}
          {currentRole && screeningStatus !== "loading" && (
            <p className="text-sm text-zinc-500">
              Showing verdicts for &ldquo;{currentRole}&rdquo;
            </p>
          )}
          <CandidateRoster candidates={candidates} />
          <ChatPanel />
        </div>
      )}
    </main>
  );
}
