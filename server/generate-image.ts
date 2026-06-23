import { GenerateImageInput } from "@/types/image";
import { createImageProvider } from "./factory/image-provider-factory";
import {
  createGeneration,
  markGenerationFailed,
  markGenerationSuccess,
} from "./repository/generation";

// One function the app uses
export async function generateImage(input: GenerateImageInput) {
  const provider = createImageProvider();

  const result = await provider.generate({
    prompt: input.prompt,
  });

  const generation = await createGeneration({
    prompt: input.prompt,
    imageUrl: result.imageUrl,
    provider: result.provider,
    model: result.model,
  });

  try {
    await markGenerationSuccess(generation.id, result.imageUrl);

    return result;
  } catch (error) {
    await markGenerationFailed(
      generation.id,
      error instanceof Error ? error.message : "Unknown error",
    );

    throw error;
  }
}
