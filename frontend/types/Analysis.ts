export interface SkillItem {
  name: string;
  proficiency: number;
}

export interface Analysis {
  id: number;
  user_id: number;
  score: number;
  summary: string;
  recommended_role: string;
  experience_level: string;
  documentation: string;
  architecture: string;
  testing: string;
  strengths: string[];
  weaknesses: string[];
  skills: SkillItem[];
}
