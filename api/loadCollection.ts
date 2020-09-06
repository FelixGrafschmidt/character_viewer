import * as http from "http";
import * as url from "url";
import * as createServer from "connect";
import { Tedis } from "tedis";
import { Collection } from "../models/Collection";

const tedis = new Tedis({
	host: "127.0.0.1",
	port: 6378,
});

export default async function (req: createServer.IncomingMessage, res: http.ServerResponse, _next: createServer.NextFunction): Promise<void> {
	const params: url.URLSearchParams = new url.URL(req.originalUrl!, process.env._AXIOS_BASE_URL_).searchParams;

	const id: string = params.get("id") || "";
	if (id && (await tedis.exists(id))) {
		res.end(await tedis.get(id));
	} else if (id) {
		res.statusCode = 404;
		res.end(JSON.stringify(new Collection().init(id)));
	} else {
		res.statusCode = 404;
		res.end(JSON.stringify(new Collection().init()));
	}
}
