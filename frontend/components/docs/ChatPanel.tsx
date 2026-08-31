"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useChat } from "@/hooks/useChat";

export default function ChatPanel() {
  const { messages, status, error, sendMessage } = useChat();
  const [question, setQuestion] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!question.trim()) return;
    sendMessage(question);
    setQuestion("");
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ask about your candidates</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex max-h-96 flex-col gap-3 overflow-y-auto">
          {messages.length === 0 && (
            <p className="text-sm text-zinc-500">
              Ask anything about the candidates you&apos;ve searched — e.g. &ldquo;is octocat
              well versed in Python?&rdquo; or &ldquo;why should I hire X over Y?&rdquo;
            </p>
          )}
          {messages.map((m, i) => (
            <div
              key={i}
              className={
                m.role === "user"
                  ? "max-w-[85%] self-end whitespace-pre-wrap rounded-2xl bg-blue-600 px-4 py-2 text-sm text-white"
                  : "max-w-[85%] self-start whitespace-pre-wrap rounded-2xl bg-zinc-800 px-4 py-2 text-sm text-zinc-100"
              }
            >
              {m.content}
            </div>
          ))}
          {status === "loading" && (
            <div className="self-start rounded-2xl bg-zinc-800 px-4 py-2 text-sm text-zinc-400">
              Thinking...
            </div>
          )}
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            placeholder="Ask a question..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
          <Button type="submit" disabled={status === "loading"}>
            Ask
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
