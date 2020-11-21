/* eslint-disable no-array-constructor */
import * as http from "http";
import * as url from "url";
import * as createServer from "connect";
import { Tedis } from "tedis";
import { v4 } from "uuid";
const tedis = new Tedis({
	host: "127.0.0.1",
	port: 6378,
});

export default async function (req: createServer.IncomingMessage, res: http.ServerResponse, _next: createServer.NextFunction): Promise<void> {
	let collection = { id: v4(), lists: new Array<any>() };
	try {
		const params: url.URLSearchParams = new url.URL(req.originalUrl!, process.env._AXIOS_BASE_URL_).searchParams;

		res.setHeader("Content-Type", "application/json");
		res.statusCode = 404;

		const id: string = params.get("id") || "";
		if (id) {
			collection = { id, lists: [] };
			await tedis.exists(id).then(async () => {
				await tedis.get(id).then((response: any) => {
					if (typeof response === "string") {
						collection = JSON.parse(response) as { id: string; lists: Array<any> };
						res.statusCode = 200;
					}
				});
			});
		}
	} catch (error) {
		console.error(error);
	} finally {
		res.end(JSON.stringify(collection));
	}
}
