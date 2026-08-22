"use client";

import { useState } from "react";
import axios from "axios";

import { analyzeProfile } from "@/services/analysisService";
import type { Analysis } from "@/types/Analysis";

type Status = "idle" | "loading" | "success" | "error";

export function useAnalysis() {
  const [status, setStatus] = useState<Status>("idle");
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function analyze(username: string, force = false) {
    setStatus("loading");
    setError(null);
    try {
      const data = await analyzeProfile(username, force);
      setAnalysis(data);
      setStatus("success");
    } catch (err) {
      let message = "AI analysis failed. Please try again.";
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 404) {
          message = `No profile found for "${username}". Load the dashboard first.`;
        } else if (err.response?.status === 503 || err.response?.status === 502) {
          message = "AI analysis is temporarily unavailable. Please try again shortly.";
        } else if (err.response?.data?.detail) {
          message = err.response.data.detail;
        }
      }
      setError(message);
      setStatus("error");
    }
  }

  return { status, analysis, error, analyze };
}
