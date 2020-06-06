/** mime type mapping based on file extension */
const MIME_TYPES: Record<string, string> = {
  ".md": "text/markdown",
  ".html": "text/html",
  ".htm": "text/html",
  ".json": "application/json",
  ".map": "application/json",
  ".txt": "text/plain",
  ".ts": "text/typescript",
  ".tsx": "text/tsx",
  ".js": "application/javascript",
  ".jsx": "text/jsx",
  ".gz": "application/gzip",
  ".css": "text/css",
  ".wasm": "application/wasm",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".gif": "image/gif",
  ".ico": "image/x-icon",
  "default": "application/octet-stream"
};

/** 
 * The path of where to store our files
 * TODO: this should come from a .env value
*/
const STORAGE_PATH = "/Users/andrewmitchell/Documents/test_folder/";

export { MIME_TYPES, STORAGE_PATH };
