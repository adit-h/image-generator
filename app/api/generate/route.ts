import { NextRequest } from "next/server";
import { ZodError } from "zod";

import { GenerateImageSchema } from "@/lib/validator";
import { generateImage } from "@/server/generate-image";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const parsed = GenerateImageSchema.safeParse(body);
    if (!parsed.success) {
      return Response.json(
        {
          error: "Prompt is required",
        },
        {
          status: 400,
        },
      );
    }

    const image = await generateImage({ prompt: parsed.data?.prompt });

    return Response.json(image);
  } catch (error) {
    console.error(error);

    if (error instanceof ZodError) {
      return Response.json(
        {
          error: "Invalid prompt",
          details: error.flatten(),
        },
        {
          status: 400,
        },
      );
    }

    if (error instanceof Error && error.message === "Timeout") {
      return Response.json(
        {
          error: "Image generation timed out",
        },
        {
          status: 408,
        },
      );
    }

    return Response.json(
      {
        error: "Failed to generate image",
      },
      {
        status: 500,
      },
    );
  }
}
