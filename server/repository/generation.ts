import { prisma } from "@/server/db";

type generationParam = {
  prompt: string;
  imageUrl: string;
  provider: string;
};

export async function createGeneration(data: generationParam) {
  return prisma.generation.create({
    data: {
      prompt: data.prompt,
      imageUrl: data.imageUrl,
      provider: data.provider,
      status: "SUCCESS",
    },
  });
}
