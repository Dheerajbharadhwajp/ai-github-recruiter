"use client";

import { useState } from "react";
import axios from "axios";

import { askQuestion } from "@/services/chatService";
import type { ChatMessage } from "@/types/Chat";

type Status = "idle" | "loading" | "error";

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function sendMessage(question: string) {
    const trimmed = question.trim();
    if (!trimmed) return;

    setMessages((prev) => [...prev, { role: "user", content: trimmed }]);
    setStatus("loading");
    setError(null);
    try {
      const answer = await askQuestion(trimmed);
      setMessages((prev) => [...prev, { role: "assistant", content: answer }]);
      setStatus("idle");
    } catch (err) {
      let message = "Failed to get a response. Please try again.";
      if (axios.isAxiosError(err) && err.response?.data?.detail) {
        message = err.response.data.detail;
      }
      setError(message);
      setStatus("error");
    }
  }

  return { messages, status, error, sendMessage };
}
