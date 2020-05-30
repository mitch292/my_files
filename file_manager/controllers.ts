import { getBadResponseBody } from './services.ts';
import { STORAGE_PATH } from './settings.ts';

function getFile() {
}

async function addFile(
  { request, response }: { request: any; response: any },
) {
  if (!request.hasBody) {
    response.status = 400;
    response.body = getBadResponseBody("No file");
  }

  const { filePath } = await request.body();

  const file = await Deno.readFile(filePath);

  await Deno.writeFile(STORAGE_PATH, file);
}

function updateFile() {
}

function deleteFile() {
}

export { getFile, addFile, updateFile, deleteFile };
