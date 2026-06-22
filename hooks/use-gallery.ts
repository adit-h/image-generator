import { useInfiniteQuery } from "@tanstack/react-query";
import type { Generation } from "@prisma/client";

type GalleryPage = {
  items: Generation[];
  nextCursor: string | null;
};

async function fetchGallery(cursor?: string): Promise<GalleryPage> {
  const params = new URLSearchParams({ limit: "10" });
  if (cursor) params.set("cursor", cursor);

  const res = await fetch(`/api/gallery?${params}`);
  if (!res.ok) throw new Error("Failed to fetch gallery");
  return res.json();
}

export function useGallery() {
  return useInfiniteQuery({
    queryKey: ["gallery"],
    queryFn: ({ pageParam }) => fetchGallery(pageParam),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
  });
}
