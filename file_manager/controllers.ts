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
  if (!request.hasBody) {
    response.status = 400;
    response.body = getBadResponseBody("No file");
    return;
  }

  const { value : body } = await request.body();

  const file: File = getFileFromRequestBody(body);

  const fileBuffer: Uint8Array = await Deno.readFile(file.origin_location);

  try {
    await Deno.writeFile(STORAGE_PATH, fileBuffer);
  } catch (e) {
    response.status = 400;
    response.body = getBadResponseBody(e.message);
    return;
  }

  response.status = 200;
  response.body = getGoodResponseBody("ok", {});
  return;
}

function updateFile() {
}

function deleteFile() {
}

export { getFile, addFile, updateFile, deleteFile };
