import type { GeneratedImage, GenerateImageInput } from "@/types/image";

import type { ImageProvider } from "./image-provider";

export class PollinationsProvider implements ImageProvider {
  async generate(input: GenerateImageInput): Promise<GeneratedImage> {
    const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(
      input.prompt,
    )}`;
    const provider = "pollinations";

    return {
      imageUrl,
      provider,
    };
  }
}
