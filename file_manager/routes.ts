import { Router } from "../deps.ts";
import {
  handleEmptyRequestBody,
  ensureDestinationDirExists,
  errorHandler,
} from "./middleware.ts";
import { getFile, addFile, deleteFile } from "./controller.ts";

const filesRouter = new Router();

// Register middleware
filesRouter.use(handleEmptyRequestBody);
filesRouter.use(ensureDestinationDirExists);
filesRouter.use(errorHandler);

filesRouter.get("/file", getFile);
filesRouter.post("/file", addFile);
filesRouter.delete("/file", deleteFile);

export { filesRouter };
