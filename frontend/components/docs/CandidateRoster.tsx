import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { CandidateSummary } from "@/types/Candidate";

export default function CandidateRoster({ candidates }: { candidates: CandidateSummary[] }) {
  if (candidates.length === 0) {
    return (
      <p className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-10 text-center text-zinc-400">
        No candidates searched yet.
      </p>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {candidates.map((candidate) => (
        <Link key={candidate.id} href={`/dashboard/${candidate.github_username}`}>
          <Card className="h-full transition-colors hover:border-zinc-600">
            <CardContent className="flex items-start gap-4">
              <Avatar className="size-12">
                <AvatarImage
                  src={candidate.avatar_url ?? undefined}
                  alt={candidate.github_username}
                />
                <AvatarFallback>
                  {candidate.github_username.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <p className="font-semibold text-white">
                  {candidate.name ?? candidate.github_username}
                </p>
                <p className="text-sm text-zinc-400">@{candidate.github_username}</p>

                {candidate.has_analysis ? (
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <Badge>{candidate.score}/100</Badge>
                    <span className="text-sm text-zinc-300">{candidate.recommended_role}</span>
                  </div>
                ) : (
                  <Badge variant="outline" className="mt-3">
                    Analysis pending
                  </Badge>
                )}

                {candidate.screening && (
                  <div className="mt-3 space-y-1">
                    <Badge
                      variant={candidate.screening.verdict === "Approved" ? "outline" : "destructive"}
                      className={
                        candidate.screening.verdict === "Approved"
                          ? "border-transparent bg-green-500/10 text-green-500 dark:bg-green-500/20"
                          : undefined
                      }
                    >
                      {candidate.screening.verdict} for {candidate.screening.role}
                    </Badge>
                    <p className="text-xs text-zinc-400">{candidate.screening.reasoning}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
