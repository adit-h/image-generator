import { GalleryPage } from "@/app/components/GalleryPage";

export default function GalleryRoute() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen font-sans dark:bg-black">
      <main className="w-full max-w-5xl flex flex-col items-start py-5 px-16 dark:bg-black sm:items-start">
        <GalleryPage />
      </main>
    </div>
  );
}
