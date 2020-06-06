import {
  getBadResponseBody,
  getGoodResponseBody,
  getFileFromRequestBody,
} from "./services.ts";
import { STORAGE_PATH } from "./settings.ts";
import { File } from "./models.ts";

function getFile() {
}

async function addFile(
  { request, response }: { request: any; response: any },
) {
  const { value : body } = await request.body();

  const file: File = getFileFromRequestBody(body);

  const fileBuffer: Uint8Array = await Deno.readFile(file.origin_location);

  try {
    await Deno.writeFile(STORAGE_PATH + file.name, fileBuffer);
  } catch (e) {
    response.status = 400;
    response.body = getBadResponseBody(e.message);
    return;
  }

  response.status = 201;
  response.body = getGoodResponseBody("ok", {});
  return;
}

function updateFile() {
}

async function deleteFile(
  { request, response }: { request: any; response: any },
) {
  const { value : body } = await request.body();

  const file: File = getFileFromRequestBody(body);

  try {
    await Deno.remove(STORAGE_PATH + file.name);
  } catch (e) {
    response.status = 400;
    response.body = getBadResponseBody(e.message);
    return;
  }

  response.status = 201;
  response.body = getGoodResponseBody("ok", {});
  return;
}

export { getFile, addFile, updateFile, deleteFile };
