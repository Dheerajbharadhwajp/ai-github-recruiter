"use client";

import { useState } from "react";
import axios from "axios";

import { fetchProfile } from "@/services/profileService";
import type { Profile } from "@/types/Profile";

type Status = "idle" | "loading" | "success" | "error";

export function useProfileSearch() {
  const [status, setStatus] = useState<Status>("idle");
  const [profile, setProfile] = useState<Profile | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function search(rawUsername: string) {
    const username = rawUsername.trim();
    if (!username) {
      setStatus("error");
      setError("Please enter a GitHub username.");
      return;
    }
    setStatus("loading");
    setError(null);
    try {
      const data = await fetchProfile(username);
      setProfile(data);
      setStatus("success");
    } catch (err) {
      let message = "Something went wrong. Please try again.";
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 404) {
          message = `GitHub user "${username}" not found.`;
        } else if (err.response?.status === 429) {
          message = "GitHub API rate limit reached. Try again shortly.";
        } else if (err.response?.data?.detail) {
          message = err.response.data.detail;
        }
      }
      setError(message);
      setStatus("error");
    }
  }

  return { status, profile, error, search };
}
