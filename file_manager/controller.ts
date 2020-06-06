import {
  getBadResponseBody,
  getGoodResponseBody,
  getFileFromRequestBody,
  getContentType,
} from "./services.ts";
import { STORAGE_PATH } from "./settings.ts";
import { File } from "./models.ts";

async function getFile(
  { request, response }: { request: any; response: any },
) {
  const { value : body } = await request.body();

  let localFile = null;
  try {
    localFile = await Deno.readFile(body.file_path);
  } catch (e) {
    response.status = 400;
    response.body = getBadResponseBody(e.message);
    return;
  }

  response.headers.set('Content-disposition', `attachment; filename=${body.file_name}`)
  response.headers.set('Content-type', getContentType(body.file_path));

  response.status = 200;
  response.body = localFile;
  return;

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

export { getFile, addFile, deleteFile };
