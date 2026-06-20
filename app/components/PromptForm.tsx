"use client";

import { cn } from "@/lib/utils";
import { promptSchema } from "@/lib/validator";
import { useState } from "react";

export default function PromptForm() {
  const [prompt, setPrompt] = useState("");
  const [error, setError] = useState("");
  const maxLength = 300;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      console.log("Submitting prompt:", prompt);

      const parsed = promptSchema.safeParse({ prompt });
      if (!parsed.success) {
        const issue = parsed.error.issues[0];
        setError(issue.message ?? "Invalid prompt");
        return;
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative">
        <textarea
          id="main-prompt"
          cols={4}
          rows={3}
          maxLength={maxLength}
          placeholder="Start typing prompt to generate image"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className={cn(
            "w-full resize-none rounded-lg border border-zinc-300 bg-white p-4 pr-24 text-base text-zinc-900 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:border-zinc-600 dark:bg-zinc-800 dark:text-white dark:placeholder:text-zinc-400 dark:focus:ring-white",
            error && "border-red-500",
          )}
        />
        <button
          type="submit"
          disabled={!prompt.trim()}
          className="absolute bottom-3 right-2 rounded-md bg-zinc-700 px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-50 dark:bg-white dark:text-black"
        >
          Send
        </button>
      </div>
      <div className="text-right text-sm text-zinc-500 dark:text-zinc-400">
        {prompt.length} / {maxLength}
      </div>
      {error && <div className="text-red-500">{error}</div>}
    </form>
  );
}
