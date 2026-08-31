"use client";

import { useState } from "react";
import axios from "axios";

import { screenCandidates } from "@/services/candidatesService";
import type { CandidateSummary } from "@/types/Candidate";

type Status = "idle" | "loading" | "success" | "error";

export function useScreening() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function screen(role: string): Promise<CandidateSummary[] | null> {
    const trimmed = role.trim();
    if (!trimmed) {
      setStatus("error");
      setError("Please enter a role.");
      return null;
    }
    setStatus("loading");
    setError(null);
    try {
      const candidates = await screenCandidates(trimmed);
      setStatus("success");
      return candidates;
    } catch (err) {
      let message = "Screening failed. Please try again.";
      if (axios.isAxiosError(err) && err.response?.data?.detail) {
        message = err.response.data.detail;
      }
      setError(message);
      setStatus("error");
      return null;
    }
  }

  return { status, error, screen };
}
