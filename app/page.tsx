import PromptForm from "./components/PromptPage";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center max-h-screen bg-white font-sans dark:bg-black">
      <main className="w-full max-w-5xl flex flex-col items-start py-32 px-16 bg-white dark:bg-black sm:items-start">
        <PromptForm />
      </main>
    </div>
  );
}
