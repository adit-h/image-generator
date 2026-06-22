"use client";

import { useRouter } from "next/navigation";

type GalleryCardProps = {
  imageUrl: string;
  prompt: string;
  createdAt: Date;
};

export function GalleryCard({ imageUrl, prompt, createdAt }: GalleryCardProps) {
  const router = useRouter();

  const handleReusePrompt = () => {
    router.push(`/?prompt=${encodeURIComponent(prompt)}`);
  };

  return (
    <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100 group">
      <img
        src={imageUrl}
        alt={prompt}
        className="h-auto max-w-full rounded-base"
        sizes="(max-width: 768px) 50vw, 25vw"
      />
      <div className="absolute inset-0 flex flex-col gap-4 items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
        <button onClick={handleReusePrompt} className="">
          <span className="px-4 py-2 bg-white rounded-md text-sm font-medium text-black">
            Reuse
          </span>
        </button>
        <div className="text-white text-sm italic">
          Generated ({new Date(createdAt).toLocaleDateString()})
        </div>
      </div>
    </div>
  );
}
