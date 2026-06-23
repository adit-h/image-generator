import type { GeneratedImage, GenerateImageInput } from "@/types/image";
import type { ImageProvider } from "./image-provider";

const provider = `pollinations`;
const aiModel = "seedream5"; // seed is only supported by flux/zimage/seedream5/klein/seedance/nova-reel

export class PollinationsProvider implements ImageProvider {
  async generate(input: GenerateImageInput): Promise<GeneratedImage> {
    const seed = Math.floor(Math.random() * 2147483647);
    const model = input.model ?? aiModel;

    const params = new URLSearchParams({
      seed: seed.toString(),
      model,
    });

    const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(
      input.prompt,
    )}?${params.toString()}`;

    return {
      imageUrl,
      provider,
      model,
    };
  }
}
