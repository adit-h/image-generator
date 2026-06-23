import z from "zod";

export const promptSchema = z.object({
  prompt: z.string().min(1, "Prompt is required!").max(300),
});

export const GenerateImageSchema = z.object({
  prompt: z.string().trim().min(5, "Prompt too short").max(500),
  model: z.string().optional(),
});
