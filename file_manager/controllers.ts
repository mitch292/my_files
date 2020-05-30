import { getBadResponseBody, getGoodResponseBody } from "./services.ts";
import { STORAGE_PATH } from "./settings.ts";

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

  const { filePath } = await request.arrayBuffer();

  const file = await Deno.readFile(filePath);

  await Deno.writeFile(STORAGE_PATH, file);

  response.status = 200;
  response.body = getGoodResponseBody("ok", {});
}

function updateFile() {
}

function deleteFile() {
}

export { getFile, addFile, updateFile, deleteFile };
