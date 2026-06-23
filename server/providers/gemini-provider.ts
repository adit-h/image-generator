import { gemini } from "../gemini";

import type { GeneratedImage, GenerateImageInput } from "@/types/image";

import type { ImageProvider } from "./image-provider";

const provider = "gemini";
const aiModel = "gemini-2.5-flash-image";

export class GeminiProvider implements ImageProvider {
  async generate(input: GenerateImageInput): Promise<GeneratedImage> {
    const model = input.model ?? aiModel;

    const response = await gemini.models.generateContent({
      model,
      contents: input.prompt,
    });

    // TODO: Need to check the return response format
    console.log(response);

    if (!response) {
      throw new Error("No return response from Gemini");
    }

    return { imageUrl: response.data || "", provider, model: aiModel };
  }
}
