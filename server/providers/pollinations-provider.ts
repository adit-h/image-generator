import type { GeneratedImage, GenerateImageInput } from "@/types/image";

import type { ImageProvider } from "./image-provider";

export class PollinationsProvider implements ImageProvider {
  async generate(input: GenerateImageInput): Promise<GeneratedImage> {
    // Create a unique seed for the image generation to ensure different images for the same prompt
    const seed = crypto.randomUUID();

    const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(
      input.prompt,
    )}?seed=${seed}`;
    const provider = "pollinations";

    return {
      imageUrl,
      provider,
    };
  }
}
