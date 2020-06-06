import { MIME_TYPES, STORAGE_PATH } from "./settings.ts";
import { MyFileResponseObjectBody, MyFile } from "./models.ts";
import { extname } from "../deps.ts";

/** Convert a request body into our internal MyFile type */
function getFileFromRequestBody(body: any): MyFile {
  return {
    name: getFileNameWithType(body.file_path),
    type: getContentType(body.file_path),
    originLocation: body.file_path,
    destination_dir: STORAGE_PATH,
  };
}

/** 
 * Get the file name from a file path
 * 
 * Input: `/Users/deno/foo/bar.txt`
 * Output: `bar.txt`
 */
function getFileNameWithType(filePath: string): string {
  const pieces = filePath.split("/");
  return pieces[pieces.length - 1];
}

/**
 * Determine the content type of a file
 * 
 * Input: `/Users/deno/foo/bar.txt`
 * Output: `text/plain`
 */
function getContentType(filePath: string): string {
  return MIME_TYPES[extname(filePath)] || MIME_TYPES["default"];
}

/** Get a MyFileResponseObjectBody for an error */
function getBadResponseBody(message?: string): MyFileResponseObjectBody {
  return {
    success: false,
    msg: message,
  };
}

/** Get a MyFileResponseObjectBody for a 200 level response */
function getGoodResponseBody(message: string, body: any): MyFileResponseObjectBody {
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
};
