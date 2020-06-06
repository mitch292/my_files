import { ensureDir } from "../deps.ts";
import { STORAGE_PATH } from "./settings.ts";
import { getBadResponseBody } from "./services.ts";

async function handleEmptyRequestBody(ctx: any, next: any): Promise<any> {
  if (!ctx.request.hasBody) {
    ctx.response.status = 400;
    ctx.response.body = getBadResponseBody("No file");
    return;
  }
  return await next();
}

async function ensureDestinationDirExists(ctx: any, next: any): Promise<any> {
  await ensureDir(STORAGE_PATH);
  return await next();
}

export { handleEmptyRequestBody, ensureDestinationDirExists };
