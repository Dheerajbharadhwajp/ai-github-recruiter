import { api } from "./api";

export async function askQuestion(question: string): Promise<string> {
  const { data } = await api.post<{ answer: string }>(
    "/api/chat",
    { question },
    { timeout: 45000 }
  );
  return data.answer;
}
