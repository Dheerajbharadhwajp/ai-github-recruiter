export interface Repository {
  id: number;
  owner_login: string;
  repo_name: string;
  description: string | null;
  language: string | null;
  stars: number;
  forks: number;
  url: string;
  is_contributed: boolean;
}
