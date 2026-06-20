import type { GeneratedImage, GenerateImageInput } from "@/types/image";

export interface ImageProvider {
  generate(input: GenerateImageInput): Promise<GeneratedImage>;
}
