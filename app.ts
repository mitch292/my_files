import { Application } from "./deps.ts";
import { filesRouter } from "./file_manager/routes.ts";

const app = new Application();

app.use(filesRouter.routes());
app.use(filesRouter.allowedMethods());

await app.listen({ port: 8080 });
