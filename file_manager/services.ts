import { MEDIA_TYPES, decoder } from "./settings.ts";
import { extname } from "../deps.ts";

function getContentType(filePath: string): string | undefined {
  return MEDIA_TYPES[extname(filePath)];
}

function getBadResponseBody(message: string | null) {
  return {
    success: false,
    msg: message,
  };
}

export { getContentType, getBadResponseBody };
