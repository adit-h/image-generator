import type { GeneratedImage, GenerateImageInput } from "@/types/image";
import type { ImageProvider } from "./image-provider";

const provider = `pollinations`;
const aiModel = "seedream5";
const REQUEST_TIMEOUT = 30000; // default: 30000 ms - 30 seconds
// const REQUEST_TIMEOUT = 1000; //! failure test: 1 second RTO

function fetchWithTimeout(
  url: string,
  options: RequestInit = {},
  timeoutMs: number = REQUEST_TIMEOUT,
): Promise<Response> {
  return new Promise((resolve, reject) => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      controller.abort();
      reject(new Error("Request Timeout"));
    }, timeoutMs);

    fetch(url, { ...options, signal: controller.signal })
      .then((response) => {
        clearTimeout(timeoutId);
        resolve(response);
      })
      .catch((error) => {
        clearTimeout(timeoutId);
        reject(error);
      });
  });
}

export class PollinationsProvider implements ImageProvider {
  async generate(input: GenerateImageInput): Promise<GeneratedImage> {
    const seed = Math.floor(Math.random() * 2147483647);
    const model = input.model ?? aiModel;
    // const model = "seedream"; //! failure test: 500 using unavailable model

    const params = new URLSearchParams({
      seed: seed.toString(),
      model,
    });

    const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(input.prompt)}?${params.toString()}`;
    // const imageUrl = "https://this-domain-does-not-exist.ai"; //! failure test: invalid url

    // Verify the image URL is accessible and returns valid image data
    try {
      const response = await fetchWithTimeout(imageUrl, {}, REQUEST_TIMEOUT);
      console.log("fetch response >>> ", response);

      // Pollinations returns 302 redirect for images, which we accept as success
      const isRedirect = response.status === 302 || response.status === 301;
      const isOk = response.ok || isRedirect;
      console.log("isOk?", isOk);

      if (!isOk) {
        throw new Error(
          `Pollinations API returned status ${response.status}: ${response.statusText}`,
        );
      }

      const contentType = response.headers.get("content-type");
      console.log("contentType >>> ", contentType);
      // For redirects, we don't have content-type, assume valid
      const isHtmlError =
        !isRedirect &&
        (!contentType ||
          contentType.includes("text/html") ||
          (!contentType.includes("image/") && !contentType.includes("image")));

      if (isHtmlError) {
        throw new Error(
          "Invalid response: Pollinations API returned non-image content",
        );
      }
    } catch (error) {
      if (error instanceof Error && error.message === "Timeout") {
        throw error;
      }
      throw error;
    }

    return {
      imageUrl,
      provider,
      model,
    };
  }
}
