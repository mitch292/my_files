import { getBadResponseBody } from './services.ts';

async function handleEmptyRequestBody(ctx: any, next: any): Promise<any> {
	if (!ctx.request.hasBody) {
		ctx.response.status = 400;
		ctx.response.body = getBadResponseBody("No file");
		return;
	}
	return await next();
};

export { handleEmptyRequestBody}