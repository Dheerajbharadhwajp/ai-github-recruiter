import RepositoryCard from "./RepositoryCard";
import type { Repository } from "@/types/Repository";

function RepositoryGrid({ repositories }: { repositories: Repository[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {repositories.map((repo) => (
        <RepositoryCard key={repo.id} repository={repo} />
      ))}
    </div>
  );
}

export default function RepositoryList({ repositories }: { repositories: Repository[] }) {
  const owned = repositories.filter((r) => !r.is_contributed);
  const contributed = repositories.filter((r) => r.is_contributed);

  if (repositories.length === 0) {
    return (
      <p className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-10 text-center text-zinc-400">
        No public repositories found.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold text-white">Repositories</h2>
        {owned.length === 0 ? (
          <p className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-10 text-center text-zinc-400">
            No owned repositories found.
          </p>
        ) : (
          <RepositoryGrid repositories={owned} />
        )}
      </div>

      {contributed.length > 0 && (
        <div className="flex flex-col gap-4">
          <h2 className="text-lg font-semibold text-white">Contributions</h2>
          <RepositoryGrid repositories={contributed} />
        </div>
      )}
    </div>
  );
}
