import { GenerateImageInput } from "@/types/image";
import { createImageProvider } from "./factory/image-provider-factory";

// One function the app uses
export async function generateImage(input: GenerateImageInput) {
  const provider = createImageProvider();

  return provider.generate({
    prompt: input.prompt,
  });
}
