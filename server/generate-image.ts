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
    model: input.model,
  });

  // insert to database
  const generation = await createGeneration({
    prompt: input.prompt,
    imageUrl: result.imageUrl,
    provider: result.provider,
    model: result.model,
  });

  if (result.error) {
    // update generation to failed
    result.imageUrl = ""; // set to empty
    await markGenerationFailed(generation.id, result.imageUrl, result.error);
    return result;
  }

  // update generation to success
  await markGenerationSuccess(generation.id, result.imageUrl);
  return result;
}
