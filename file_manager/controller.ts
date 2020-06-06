import {
  getGoodResponseBody,
  getFileFromRequestBody,
} from "./services.ts";
import { STORAGE_PATH } from "./settings.ts";
import { MyFile } from "./models.ts";


/**
 * GET /file
 * Fetch a file from storage and provide to the client for download
 */
async function getFile(ctx: any): Promise<any> {
  const { value : body } = await ctx.request.body();

  const file: MyFile = getFileFromRequestBody(body);

  ctx.response.headers.set(
    "Content-disposition",
    `attachment; filename=${file.name}`,
  );
  ctx.response.headers.set("Content-type", file.type);
  ctx.response.status = 200;
  ctx.response.body = await Deno.readFile(file.originLocation);

  return;
}

/**
 * POST /file
 * Add a file to our storage
 */
async function addFile(ctx: any): Promise<any> {
  const { value : body } = await ctx.request.body();

  const file: MyFile = getFileFromRequestBody(body);
  const fileBuffer: Uint8Array = await Deno.readFile(file.originLocation);

  await Deno.writeFile(STORAGE_PATH + file.name, fileBuffer);

  ctx.response.status = 201;
  ctx.response.body = getGoodResponseBody("ok", {});

  return;
}

/**
 * DELETE /file
 * Remove a file from storage
 */
async function deleteFile(ctx: any): Promise<any> {
  const { value : body } = await ctx.request.body();

  const file: MyFile = getFileFromRequestBody(body);

  await Deno.remove(STORAGE_PATH + file.name);

  ctx.response.status = 200;
  ctx.response.body = getGoodResponseBody("ok", {});

  return;
}

export { getFile, addFile, deleteFile };
