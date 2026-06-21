import { GalleryPage } from "../components/GalleryPage";

export default function GalleryRoute() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-50 font-sans dark:bg-black">
      <main className="w-full max-w-3xl flex flex-col items-start py-32 px-16 bg-white dark:bg-black sm:items-start">
        <GalleryPage />
      </main>
    </div>
  );
}
