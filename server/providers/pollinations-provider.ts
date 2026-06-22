import type { GeneratedImage, GenerateImageInput } from "@/types/image";

import type { ImageProvider } from "./image-provider";

export class PollinationsProvider implements ImageProvider {
  async generate(input: GenerateImageInput): Promise<GeneratedImage> {
    // Create a unique number for the image generation to ensure different images for the same prompt
    const seed = Math.floor(Math.random() * 2147483647);

    const params = new URLSearchParams({
      seed: seed.toString(),
      model: "flux", // seed is only supported by flux/zimage/seedream/klein/seedance/nova-reel
    });

    const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(
      input.prompt,
    )}?${params.toString()}`;
    const provider = "pollinations";

    return {
      imageUrl,
      provider,
    };
  }
}
