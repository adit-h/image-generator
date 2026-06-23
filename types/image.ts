export interface GeneratedImage {
  imageUrl: string;
  provider: string;
  model: string;
}

export interface GenerateImageInput {
  prompt: string;
  model?: string;
}
