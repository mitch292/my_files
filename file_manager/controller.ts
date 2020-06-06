import {
  getGoodResponseBody,
  getFileFromRequestBody,
} from "./services.ts";
import { STORAGE_PATH } from "./settings.ts";
import { File } from "./models.ts";

async function getFile(ctx: any): Promise<any> {
  const { value : body } = await ctx.request.body();

  const file: File = getFileFromRequestBody(body);

  ctx.response.headers.set(
    "Content-disposition",
    `attachment; filename=${file.name}`,
  );
  ctx.response.headers.set("Content-type", file.type);
  ctx.response.status = 200;
  ctx.response.body = await Deno.readFile(file.originLocation);

  return;
}

async function addFile(ctx: any): Promise<any> {
  const { value : body } = await ctx.request.body();

  const file: File = getFileFromRequestBody(body);
  const fileBuffer: Uint8Array = await Deno.readFile(file.originLocation);

  await Deno.writeFile(STORAGE_PATH + file.name, fileBuffer);

  ctx.response.status = 201;
  ctx.response.body = getGoodResponseBody("ok", {});

  return;
}

async function deleteFile(ctx: any): Promise<any> {
  const { value : body } = await ctx.request.body();

  const file: File = getFileFromRequestBody(body);

  await Deno.remove(STORAGE_PATH + file.name);

  ctx.response.status = 200;
  ctx.response.body = getGoodResponseBody("ok", {});

  return;
}

export { getFile, addFile, deleteFile };
