import { ensureDir } from "../deps.ts";
import { STORAGE_PATH } from "./settings.ts";
import { getBadResponseBody } from "./services.ts";

/** Catch an empty request body and return a 400 response*/
async function handleEmptyRequestBody(ctx: any, next: any): Promise<any> {
  if (!ctx.request.hasBody) {
    ctx.response.status = 400;
    ctx.response.body = getBadResponseBody("No file specified");
    return;
  }
  return await next();
}

/** Check or create that our storage path exists before any operations */
async function ensureDestinationDirExists(ctx: any, next: any): Promise<any> {
  await ensureDir(STORAGE_PATH);
  return await next();
}

/** Catch and handle errors */
async function errorHandler(ctx: any, next: any): Promise<any> {
  try {
    return await next();
  } catch (err) {
    ctx.response.status = 400;
    ctx.response.body = getBadResponseBody(err.message);
    return;
  }
}

export { handleEmptyRequestBody, ensureDestinationDirExists, errorHandler };
