"use client";

import { use, useEffect } from "react";
import Link from "next/link";

import AnalysisSection from "@/components/dashboard/AnalysisSection";
import DashboardSkeleton from "@/components/dashboard/DashboardSkeleton";
import ProfileHeader from "@/components/dashboard/ProfileHeader";
import RepositoryList from "@/components/dashboard/RepositoryList";
import { useProfileSearch } from "@/hooks/useProfileSearch";

export default function DashboardPage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = use(params);
  const { status, profile, error, search } = useProfileSearch();

  useEffect(() => {
    search(username);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username]);

  return (
    <main className="mx-auto min-h-screen max-w-5xl px-6 py-16">
      <Link href="/" className="mb-8 inline-block text-sm text-zinc-400 hover:text-white">
        &larr; Back to search
      </Link>

      {status === "loading" && <DashboardSkeleton />}

      {status === "error" && (
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-10 text-center">
          <p className="text-red-500">{error}</p>
          <Link href="/" className="mt-4 inline-block text-sm text-zinc-400 underline hover:text-white">
            Try another username
          </Link>
        </div>
      )}

      {status === "success" && profile && (
        <div className="flex flex-col gap-8">
          <ProfileHeader profile={profile} />
          <RepositoryList repositories={profile.repositories} />
          <AnalysisSection username={profile.github_username} />
        </div>
      )}
    </main>
  );
}
