import { prisma } from "@/server/db";

type generationParam = {
  prompt: string;
  imageUrl: string;
  provider: string;
};

type getGenerationsParams = {
  cursor?: string;
  limit: number;
};

export async function createGeneration(data: generationParam) {
  return prisma.generation.create({
    data: {
      prompt: data.prompt,
      imageUrl: data.imageUrl,
      provider: data.provider,
      status: "PENDING",
    },
  });
}

export async function getGenerations({ cursor, limit }: getGenerationsParams) {
  const rows = await prisma.generation.findMany({
    take: limit + 1, // fetch one extra to know if there's a next page
    ...(cursor && {
      cursor: { id: cursor },
      skip: 1, // skip the cursor row itself
    }),
    where: {
      status: { not: "FAILED" },
      imageUrl: { not: "" },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const hasNextPage = rows.length > limit;
  const items = hasNextPage ? rows.slice(0, -1) : rows; // remove the extra item if it exists
  const nextCursor = hasNextPage ? items[items.length - 1].id : null;

  return { items, nextCursor };
}

export async function markGenerationSuccess(id: string, imageUrl: string) {
  return prisma.generation.update({
    where: {
      id,
    },
    data: {
      imageUrl,
      status: "SUCCESS",
      error: null,
    },
  });
}

export async function markGenerationFailed(id: string, error: string) {
  return prisma.generation.update({
    where: {
      id,
    },
    data: {
      status: "FAILED",
      error,
    },
  });
}
