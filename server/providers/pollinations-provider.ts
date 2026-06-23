import type { GeneratedImage, GenerateImageInput } from "@/types/image";

import type { ImageProvider } from "./image-provider";

const provider = `pollinations`;
const aiModel = "seedream5"; // seed is only supported by flux/zimage/seedream5/klein/seedance/nova-reel

export class PollinationsProvider implements ImageProvider {
  async generate(input: GenerateImageInput): Promise<GeneratedImage> {
    // Create a unique number for the image generation to ensure different images for the same prompt
    const seed = Math.floor(Math.random() * 2147483647);

    const params = new URLSearchParams({
      seed: seed.toString(),
      model: aiModel,
    });

    const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(
      input.prompt,
    )}?${params.toString()}`;

    return {
      imageUrl,
      provider,
      model: aiModel,
    };
  }
}
