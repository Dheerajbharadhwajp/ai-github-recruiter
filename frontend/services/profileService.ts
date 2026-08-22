import { api } from "./api";
import type { Profile } from "@/types/Profile";

export async function fetchProfile(username: string): Promise<Profile> {
  const { data } = await api.post<Profile>("/api/profile", { username });
  return data;
}
