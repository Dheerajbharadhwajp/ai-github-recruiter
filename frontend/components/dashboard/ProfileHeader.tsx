import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Profile } from "@/types/Profile";

export default function ProfileHeader({ profile }: { profile: Profile }) {
  return (
    <div className="flex flex-col gap-6 rounded-3xl border border-zinc-800 bg-zinc-900/50 p-10 sm:flex-row sm:items-center">
      <Avatar size="lg" className="size-20">
        <AvatarImage src={profile.avatar_url ?? undefined} alt={profile.github_username} />
        <AvatarFallback className="text-2xl">
          {profile.github_username.charAt(0).toUpperCase()}
        </AvatarFallback>
      </Avatar>

      <div className="flex-1">
        <h1 className="text-2xl font-semibold text-white">
          {profile.name ?? profile.github_username}
        </h1>
        <p className="text-zinc-400">@{profile.github_username}</p>
        {profile.bio && <p className="mt-2 max-w-2xl text-zinc-300">{profile.bio}</p>}
      </div>

      <div className="flex gap-8 sm:gap-10">
        <Stat label="Followers" value={profile.followers} />
        <Stat label="Following" value={profile.following} />
        <Stat label="Repos" value={profile.public_repos} />
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="text-center">
      <p className="text-xl font-semibold text-white">{value.toLocaleString()}</p>
      <p className="text-xs text-zinc-500">{label}</p>
    </div>
  );
}
