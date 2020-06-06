import { Router } from "../deps.ts";
import {
  handleEmptyRequestBody,
  ensureDestinationDirExists,
} from "./middleware.ts";
import { getFile, addFile, updateFile, deleteFile } from "./controllers.ts";

const filesRouter = new Router();

filesRouter.use(handleEmptyRequestBody);
filesRouter.use(ensureDestinationDirExists);

filesRouter.get("/file", getFile);
filesRouter.post("/file", addFile);
filesRouter.put("/file", updateFile);
filesRouter.delete("/file", deleteFile);

export { filesRouter };
