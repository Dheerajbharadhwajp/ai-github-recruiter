import type { Repository } from "./Repository";

export interface Profile {
  id: number;
  github_username: string;
  name: string | null;
  bio: string | null;
  avatar_url: string | null;
  followers: number;
  following: number;
  public_repos: number;
  repositories: Repository[];
}
