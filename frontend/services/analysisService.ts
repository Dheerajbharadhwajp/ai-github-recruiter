import { api } from "./api";
import type { Analysis } from "@/types/Analysis";

export async function analyzeProfile(username: string, force = false): Promise<Analysis> {
  const { data } = await api.post<Analysis>(
    "/api/analyze",
    { username, force },
    { timeout: 60000 }
  );
  return data;
}
