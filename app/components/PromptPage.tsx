"use client";

import { cn } from "@/lib/utils";
import { promptSchema } from "@/lib/validator";
import { useState } from "react";

export default function PromptPage() {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [error, setError] = useState("");
  const maxLength = 300;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    if (prompt.trim()) {
      console.log("Submitting prompt:", prompt);

      const parsed = promptSchema.safeParse({ prompt });
      if (!parsed.success) {
        const issue = parsed.error.issues[0];
        setError(issue.message ?? "Invalid prompt");
        return;
      }
    }

    try {
      setIsLoading(true);

      await handleGenerate();
    } catch (error) {
      setError(error instanceof Error ? error.message : "Unknown error");
    } finally {
      setIsLoading(false);
    }
  };

  async function handleGenerate() {
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
      }),
    });

    const data = await response.json();

    setImageUrl(data.imageUrl);
  }

  return (
    <>
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
            disabled={!prompt.trim() || isLoading}
            className="absolute bottom-3 right-2 rounded-md bg-zinc-700 px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-50 dark:bg-white dark:text-black"
          >
            {isLoading ? "Generating..." : "Generate"}
          </button>
        </div>
        <div className="text-right text-sm text-zinc-500 dark:text-zinc-400">
          {prompt.length} / {maxLength}
        </div>
        {error && <div className="text-red-500">{error}</div>}
      </form>
      {/* Preview generated image */}
      {imageUrl && (
        <div className="mt-6">
          <h2 className="mb-2 font-medium">Generated Image</h2>

          <div className="relative w-96">
            {imageLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-zinc-100 dark:bg-zinc-800 rounded-lg">
                <div className="w-8 h-8 border-2 border-zinc-300 border-t-zinc-700 rounded-full animate-spin"></div>
              </div>
            )}
            <img
              src={imageUrl}
              alt={prompt}
              className={cn(
                "w-96 rounded-lg",
                imageLoading ? "opacity-0" : "opacity-100",
              )}
              width={256}
              height={256}
              onLoad={() => setImageLoading(false)}
            />
          </div>
        </div>
      )}
    </>
  );
}
