export interface ScreeningInfo {
  role: string;
  verdict: string;
  reasoning: string;
}

export interface CandidateSummary {
  id: number;
  github_username: string;
  name: string | null;
  avatar_url: string | null;
  has_analysis: boolean;
  score: number | null;
  recommended_role: string | null;
  experience_level: string | null;
  screening: ScreeningInfo | null;
}

export interface CandidateListResponse {
  candidates: CandidateSummary[];
}
