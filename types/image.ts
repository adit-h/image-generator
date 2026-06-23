export interface GeneratedImage {
  imageUrl: string;
  provider: string;
  model: string;
  error?: string;
}

export interface GenerateImageInput {
  prompt: string;
  model?: string;
}
