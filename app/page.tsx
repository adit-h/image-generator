import { Suspense } from "react";
import PromptForm from "@/app/components/PromptPage";
import { LoadingSpinner } from "./components/LoadingSpinner";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen font-sans dark:bg-black">
      <main className="w-full max-w-5xl flex flex-col items-start py-3 px-16 dark:bg-black sm:items-start">
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
      <LoadingSpinner />
    </div>
  );
}
