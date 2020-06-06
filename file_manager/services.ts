import { MEDIA_TYPES, STORAGE_PATH } from "./settings.ts";
import { FileResponseObject, File } from "./models.ts";
import { extname } from "../deps.ts";

function getFileFromRequestBody(body: any): File {
  return {
    short_name: body.file_name,
    name: getFileNameWithType(body.file_path),
    fileType: getContentType(body.file_path),
    origin_location: body.file_path,
    destination_dir: STORAGE_PATH,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
}

function getFileNameWithType(filePath: string): string {
  const pieces = filePath.split("/");
  return pieces[pieces.length - 1];
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

export {
  getGoodResponseBody,
  getBadResponseBody,
  getFileFromRequestBody,
  getContentType,
  getFileNameWithType,
};
