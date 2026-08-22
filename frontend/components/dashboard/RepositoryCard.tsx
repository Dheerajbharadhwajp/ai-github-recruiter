import { ExternalLink, GitFork, Star } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import type { Repository } from "@/types/Repository";

export default function RepositoryCard({ repository }: { repository: Repository }) {
  return (
    <a
      href={repository.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col gap-3 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 transition-colors hover:border-zinc-700"
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-mono text-sm font-medium text-white">{repository.repo_name}</h3>
        <ExternalLink className="h-4 w-4 shrink-0 text-zinc-500 group-hover:text-zinc-300" />
      </div>

      {repository.is_contributed && (
        <p className="text-xs text-zinc-500">Contributed &middot; by {repository.owner_login}</p>
      )}

      {repository.description && (
        <p className="line-clamp-2 text-sm text-zinc-400">{repository.description}</p>
      )}

      <div className="mt-auto flex items-center gap-4 text-xs text-zinc-500">
        {repository.language && <Badge variant="outline">{repository.language}</Badge>}
        <span className="flex items-center gap-1">
          <Star className="h-3.5 w-3.5" />
          {repository.stars.toLocaleString()}
        </span>
        <span className="flex items-center gap-1">
          <GitFork className="h-3.5 w-3.5" />
          {repository.forks.toLocaleString()}
        </span>
      </div>
    </a>
  );
}
