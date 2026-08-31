import { api } from "./api";
import type { CandidateListResponse, CandidateSummary } from "@/types/Candidate";

export async function fetchCandidates(): Promise<CandidateSummary[]> {
  const { data } = await api.get<CandidateListResponse>("/api/candidates");
  return data.candidates;
}

export async function resetCandidates(): Promise<void> {
  await api.delete("/api/candidates");
}

export async function screenCandidates(role: string): Promise<CandidateSummary[]> {
  const { data } = await api.post<CandidateListResponse>(
    "/api/candidates/screen",
    { role },
    { timeout: 60000 }
  );
  return data.candidates;
}
