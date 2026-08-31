"use client";

import { useEffect, useState } from "react";
import axios from "axios";

import { fetchCandidates, resetCandidates } from "@/services/candidatesService";
import type { CandidateSummary } from "@/types/Candidate";

type Status = "idle" | "loading" | "success" | "error";

export function useCandidates() {
  const [status, setStatus] = useState<Status>("idle");
  const [candidates, setCandidates] = useState<CandidateSummary[]>([]);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    setStatus("loading");
    setError(null);
    try {
      const data = await fetchCandidates();
      setCandidates(data);
      setStatus("success");
    } catch (err) {
      let message = "Failed to load candidates. Please try again.";
      if (axios.isAxiosError(err) && err.response?.data?.detail) {
        message = err.response.data.detail;
      }
      setError(message);
      setStatus("error");
    }
  }

  async function reset() {
    await resetCandidates();
    setCandidates([]);
  }

  useEffect(() => {
    load();
  }, []);

  return { status, candidates, error, reload: load, reset, setCandidates };
}
