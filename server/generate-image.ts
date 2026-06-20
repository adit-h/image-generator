import { GenerateImageInput } from "@/types/image";
import { createImageProvider } from "./factory/image-provider-factory";
import { createGeneration } from "./repository/generation";

// One function the app uses
export async function generateImage(input: GenerateImageInput) {
  const provider = createImageProvider();

  const result = await provider.generate({
    prompt: input.prompt,
  });

  await createGeneration({
    prompt: input.prompt,
    imageUrl: result.imageUrl,
    provider: result.provider,
  });

  return result;
}
