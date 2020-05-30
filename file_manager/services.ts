import { MEDIA_TYPES } from "./settings.ts";
import { extname } from "../deps.ts";

interface ResponseObject {
  success: boolean;
  msg?: string;
  body?: any;
}

function getContentType(filePath: string): string | undefined {
  return MEDIA_TYPES[extname(filePath)];
}

function getBadResponseBody(message?: string): ResponseObject {
  return {
    success: false,
    msg: message,
  };
}

function getGoodResponseBody(message: string, body: any): ResponseObject {
  return {
    success: true,
    msg: message,
    body,
  };
}

export { getContentType, getBadResponseBody, getGoodResponseBody };
