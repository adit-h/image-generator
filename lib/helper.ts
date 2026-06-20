import type { GenerateContentResponse } from "@google/genai";

type GeneratedImage = {
  mimeType: string;
  data: string;
};

type InlineDataPart = {
  inlineData: {
    data: string;
    mimeType: string;
  };
};

function isInlineDataPart(part: unknown): part is InlineDataPart {
  return typeof part === "object" && part !== null && "inlineData" in part;
}

export function extractImage(
  response: GenerateContentResponse,
): GeneratedImage {
  const parts = response.candidates?.[0]?.content?.parts ?? [];

  const imagePart = parts.find(isInlineDataPart);

  if (!imagePart) {
    throw new Error("No image returned from Gemini");
  }

  const generated = {
    data: imagePart.inlineData.data,
    mimeType: imagePart.inlineData.mimeType,
  };

  return generated;
}
