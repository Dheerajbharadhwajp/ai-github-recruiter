"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { useAnalysis } from "@/hooks/useAnalysis";

const QUALITY_VARIANT: Record<string, "default" | "secondary" | "outline" | "destructive"> = {
  Excellent: "default",
  Good: "secondary",
  Average: "outline",
  Poor: "destructive",
};

export default function AnalysisSection({ username }: { username: string }) {
  const { status, analysis, error, analyze } = useAnalysis();

  if (status === "idle") {
    return (
      <div className="flex flex-col items-center gap-3 rounded-3xl border border-zinc-800 bg-zinc-900/50 p-10 text-center">
        <p className="text-zinc-400">Get an AI-generated employability analysis for this profile.</p>
        <Button onClick={() => analyze(username)}>Run AI Analysis</Button>
      </div>
    );
  }

  if (status === "loading") {
    return (
      <div className="flex flex-col gap-4 rounded-3xl border border-zinc-800 bg-zinc-900/50 p-10">
        <Skeleton className="h-6 w-40" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="rounded-3xl border border-zinc-800 bg-zinc-900/50 p-10 text-center">
        <p className="text-red-500">{error}</p>
        <Button variant="outline" className="mt-4" onClick={() => analyze(username)}>
          Try again
        </Button>
      </div>
    );
  }

  if (status === "success" && analysis) {
    return (
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">AI Analysis</h2>
          <Button variant="outline" size="sm" onClick={() => analyze(username, true)}>
            Re-run analysis
          </Button>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Score</CardTitle>
            </CardHeader>
            <CardContent className="text-3xl font-semibold text-white">
              {analysis.score}/100
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Recommended Role</CardTitle>
            </CardHeader>
            <CardContent>{analysis.recommended_role}</CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Experience Level</CardTitle>
            </CardHeader>
            <CardContent>{analysis.experience_level}</CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Summary</CardTitle>
          </CardHeader>
          <CardContent className="text-zinc-300">{analysis.summary}</CardContent>
        </Card>

        <div className="grid gap-4 sm:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Strengths</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc space-y-1 pl-5 text-zinc-300">
                {analysis.strengths.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Weaknesses</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc space-y-1 pl-5 text-zinc-300">
                {analysis.weaknesses.map((w, i) => (
                  <li key={i}>{w}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-wrap gap-3">
          <Badge variant={QUALITY_VARIANT[analysis.documentation] ?? "outline"}>
            Docs: {analysis.documentation}
          </Badge>
          <Badge variant={QUALITY_VARIANT[analysis.architecture] ?? "outline"}>
            Architecture: {analysis.architecture}
          </Badge>
          <Badge variant={QUALITY_VARIANT[analysis.testing] ?? "outline"}>
            Testing: {analysis.testing}
          </Badge>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Skills</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            {analysis.skills.map((s) => (
              <div key={s.name} className="space-y-1">
                <div className="flex justify-between text-sm text-zinc-300">
                  <span>{s.name}</span>
                  <span>{s.proficiency}%</span>
                </div>
                <Progress value={s.proficiency} />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    );
  }

  return null;
}
