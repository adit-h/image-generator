import { Suspense } from "react";
import PromptForm from "@/app/components/PromptPage";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white font-sans dark:bg-black">
      <main className="w-full max-w-5xl flex flex-col items-start py-32 px-16 bg-white dark:bg-black sm:items-start">
        <Suspense fallback={<PromptFormSkeleton />}>
          <PromptForm />
        </Suspense>
      </main>
    </div>
  );
}

function PromptFormSkeleton() {
  return (
    <div className="w-full">
      <div className="h-32 w-full animate-pulse rounded-lg border border-zinc-300 bg-zinc-100 dark:border-zinc-600 dark:bg-zinc-800" />
    </div>
  );
}
