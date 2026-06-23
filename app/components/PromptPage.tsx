"use client";

import { cn } from "@/lib/utils";
import { promptSchema } from "@/lib/validator";
import { useState } from "react";
import { useSearchParams } from "next/navigation";

export default function PromptPage() {
  const searchParams = useSearchParams();
  const [reuseFlag, setReuseFlag] = useState(
    searchParams.get("prompt") ? true : false,
  );
  const [prompt, setPrompt] = useState(searchParams.get("prompt") ?? "");
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
    console.log("Generate log >>> ", response);

    if (!response.ok) {
      const errBody = await response.json().catch(() => null);
      throw new Error(errBody?.error ?? "Failed to generate image");
    }

    const data = await response.json();
    setImageLoading(true);
    setImageUrl(data.imageUrl);
  }

  return (
    <div className="w-full max-w-4xl text-white">
      <div className="text-center mb-8">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight">
          Visualize Your <span className="text-amber-300">Dream Interior</span>
        </h1>

        <p className="mt-5 text-lg md:text-xl max-w-2xl mx-auto">
          Describe any room, style, material, lighting, or furniture and
          generate stunning interior design concepts in seconds.
        </p>
      </div>

      <div className="backdrop-blur-xl bg-white/10 border border-white/15 rounded-3xl shadow-2xl p-6 md:p-8">
        <div className="flex items-center justify-between mb-1">
          <label className="block text-sm font-medium">
            Describe the space you&rsquo;d like to create
          </label>{" "}
          <div className="text-right text-xs text-zinc-500 dark:text-zinc-400 py-1">
            {prompt.length} / {maxLength}
          </div>
        </div>
        <form onSubmit={handleSubmit} className="w-full">
          <div className="relative">
            <textarea
              id="main-prompt"
              rows={4}
              maxLength={maxLength}
              placeholder="Modern Japanese living room with floor-to-ceiling windows, warm oak wood finishes, natural sunlight, minimalist furniture, indoor plants, architectural photography..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className={cn(
                "w-full resize-none relative rounded-lg border border-zinc-300 bg-white p-4 text-sm text-zinc-900 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:border-zinc-600 dark:bg-zinc-800 dark:text-white dark:placeholder:text-zinc-400 dark:focus:ring-white",
                error && "border-red-500",
              )}
            />
            {reuseFlag && (
              <div className="absolute bottom-3 right-2 text-xs italic text-gray-400 py-1 px-2 border-1 border-dashed rounded-lg">
                Reuse prompt
              </div>
            )}
          </div>
          {error && <div className="text-red-500">{error}</div>}
          <button
            type="submit"
            disabled={!prompt.trim() || isLoading}
            className="mt-1 w-full h-14 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-900 font-semibold text-lg transition disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isLoading ? "Generating..." : "Generate Design Concept"}
          </button>
        </form>
        {/* Preview generated image */}
        {imageUrl && (
          <div className="mt-6">
            <h2 className="mb-2 text-sm font-medium text-slate-500">
              Generated Design
            </h2>

            <div className="relative w-full">
              {imageLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-zinc-100 dark:bg-zinc-800 rounded-lg">
                  <div className="w-8 h-8 border-2 border-zinc-300 border-t-zinc-700 rounded-full animate-spin"></div>
                </div>
              )}
              <img
                src={imageUrl}
                alt={prompt}
                className={cn(
                  "w-96 rounded-lg mx-auto",
                  imageLoading ? "opacity-0" : "opacity-100",
                )}
                width={256}
                height={256}
                onLoad={() => setImageLoading(false)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
