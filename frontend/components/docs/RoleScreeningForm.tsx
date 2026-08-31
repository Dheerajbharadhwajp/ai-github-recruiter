"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function RoleScreeningForm({
  onSubmit,
  loading,
}: {
  onSubmit: (role: string) => void;
  loading: boolean;
}) {
  const [role, setRole] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit(role);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 sm:flex-row sm:items-center"
    >
      <div className="flex-1">
        <label htmlFor="role" className="mb-1 block text-sm text-zinc-400">
          What role is the company hiring for?
        </label>
        <Input
          id="role"
          placeholder="e.g. Full Stack Developer"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />
      </div>
      <Button type="submit" disabled={loading} className="sm:mt-6">
        {loading ? "Screening..." : "Screen candidates"}
      </Button>
    </form>
  );
}
