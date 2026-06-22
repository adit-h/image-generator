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

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { rootMargin: "200px" },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

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
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
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
        <div className="p-4 text-center text-sm text-gray-400">
          Loading more…
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
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="aspect-square rounded-lg bg-gray-100 animate-pulse"
        />
      ))}
    </div>
  );
}
