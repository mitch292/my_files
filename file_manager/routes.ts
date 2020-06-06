import { Router } from "../deps.ts";
import { getFile, addFile, updateFile, deleteFile } from "./controllers.ts";
import { getBadResponseBody } from './services.ts';

const filesRouter = new Router();

filesRouter.use(async (ctx, next) => {
	if (!ctx.request.hasBody) {
		ctx.response.status = 400;
		ctx.response.body = getBadResponseBody("No file");
		return;
	  }
})

filesRouter.get("/file", getFile);
filesRouter.post("/file", addFile);
filesRouter.put("/file", updateFile);
filesRouter.delete("/file", deleteFile);

export { filesRouter };
