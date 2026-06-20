import { GeminiProvider } from "../providers/gemini-provider";

import { PollinationsProvider } from "../providers/pollinations-provider";

export function createImageProvider() {
  const provider = process.env.IMAGE_PROVIDER;

  switch (provider) {
    case "gemini":
      return new GeminiProvider();

    case "pollinations":
      return new PollinationsProvider();

    default:
      return new PollinationsProvider();
  }
}
