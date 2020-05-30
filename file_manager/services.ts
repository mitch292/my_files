import { MEDIA_TYPES, STORAGE_PATH } from "./settings.ts";
import { FileResponseObject, File } from "./models.ts";
import { extname } from "../deps.ts";

function getFileFromRequestBody(body: any): File {
  return {
    short_name: body.file_name,
    name: body.file_name, // TODO: pull the last part of the path
    fileType: getContentType(body.file_path),
    origin_location: body.file_path,
    destination_dir: STORAGE_PATH,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
}

function getContentType(filePath: string): string {
  return MEDIA_TYPES[extname(filePath)] || "unknown";
}

function getBadResponseBody(message?: string): FileResponseObject {
  return {
    success: false,
    msg: message,
  };
}

function getGoodResponseBody(message: string, body: any): FileResponseObject {
  return {
    success: true,
    msg: message,
    body,
  };
}

export { getBadResponseBody, getGoodResponseBody, getFileFromRequestBody };
