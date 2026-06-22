"use client";

import { useEffect, useRef } from "react";
import { useGallery } from "@/hooks/use-gallery";
import { GalleryCard } from "@/app/components/GalleryCard";

export function GalleryPage() {
  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGallery();

  const sentinelRef = useRef<HTMLDivElement>(null);

  /**
   * How it works:
   * Each time deps change, a new IntersectionObserver is created with isPending = true
   * The immediate trigger (sentinel already in viewport) is consumed as a "reset signal" — sets isPending = false and returns without fetching
   * Actual user scrolls hit isPending = false, pass the guard, set isPending = true, and call fetchNextPage()
   * Old observer is disconnected in cleanup before the new one is created
   */
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    let isPending = true;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (!entry.isIntersecting) return;
        if (isPending) {
          isPending = false;
          return;
        }
        if (!hasNextPage) return;
        isPending = true;
        fetchNextPage();
      },
      { rootMargin: "200px" },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (isLoading) return <GallerySkeleton />;

  if (isError) {
    return (
      <div className="p-8 text-center text-red-500">
        Failed to load gallery: {error.message}
      </div>
    );
  }

  const images = data?.pages.flatMap((page) => page.items) ?? [];

  if (images.length === 0) {
    return (
      <div className="p-8 text-center text-gray-500">No generations yet.</div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="text-2xl font-semibold">Gallery</div>
        <div className="text-gray-500 text-sm font-normal self-end">
          ({images.length} {images.length === 1 ? "image" : "images"})
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {images.map((image) => (
          <GalleryCard
            key={image.id}
            imageUrl={image.imageUrl}
            prompt={image.prompt}
            createdAt={image.createdAt}
          />
        ))}
      </div>

      <div ref={sentinelRef} className="h-10" />

      {isFetchingNextPage && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="aspect-square rounded-lg bg-gray-100 animate-pulse"
            />
          ))}
        </div>
      )}
      {!hasNextPage && (
        <div className="p-4 text-center text-sm text-gray-400">
          You have reached the end.
        </div>
      )}
    </div>
  );
}

function GallerySkeleton() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-4">
      <div className="absolute inset-0 flex items-center justify-center bg-zinc-100 dark:bg-zinc-800 rounded-lg">
        <div className="w-8 h-8 border-2 border-zinc-300 border-t-zinc-700 rounded-full animate-spin"></div>
      </div>
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="aspect-square rounded-lg bg-gray-100 animate-pulse"
        />
      ))}
    </div>
  );
}
