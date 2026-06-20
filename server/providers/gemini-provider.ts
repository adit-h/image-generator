import { gemini } from "../gemini";

import type { GeneratedImage, GenerateImageInput } from "@/types/image";

import type { ImageProvider } from "./image-provider";

export class GeminiProvider implements ImageProvider {
  async generate(input: GenerateImageInput): Promise<GeneratedImage> {
    const response = await gemini.models.generateContent({
      model: "gemini-2.5-flash-image",
      contents: input.prompt,
    });
    const provider = "gemini";

    // TODO: Need to check the return response format
    console.log(response);

    if (!response) {
      throw new Error("No return response from Gemini");
    }

    return { imageUrl: response.data || "", provider };
  }
}
