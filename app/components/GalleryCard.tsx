"use client";

import { formatDate } from "@/lib/utils";
import Link from "next/link";

type GalleryCardProps = {
  imageUrl: string;
  prompt: string;
  model: string;
  createdAt: Date;
};

export function GalleryCard({
  imageUrl,
  prompt,
  model,
  createdAt,
}: GalleryCardProps) {
  return (
    <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100 group">
      <img
        src={imageUrl}
        alt={prompt}
        className="h-auto max-w-full rounded-base"
        sizes="(max-width: 768px) 50vw, 25vw"
      />
      <div className="absolute inset-0 flex flex-col gap-4 items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
        <Link
          href={{
            pathname: "/", // redirect back to prompt page
            query: { prompt, image: imageUrl },
          }}
          className="px-4 py-2 rounded-md bg-black/60 px-2 py-1 text-xs font-medium text-black bg-white hover:bg-white/80"
        >
          Reuse Prompt
        </Link>
        <div className="flex text-white text-xs italic">
          Generated ({formatDate(createdAt)})
        </div>
      </div>
      {model && (
        <div className="absolute bottom-1 right-1 rounded-lg px-2 py-1 bg-black/60 text-xs text-white truncate">
          {model}
        </div>
      )}
    </div>
  );
}
