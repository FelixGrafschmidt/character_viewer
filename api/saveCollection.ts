import * as http from "http";
import * as createServer from "connect";
import { Tedis } from "tedis";
import { Collection } from "../models/Collection";

const tedis = new Tedis({
	host: "127.0.0.1",
	port: 6378,
});

export default function (req: createServer.IncomingMessage, res: http.ServerResponse, _next: createServer.NextFunction): void {
	let body: string = "";
	res.statusCode = 404;

	req.on("data", async (chunk: string) => {
		body += chunk;

		const id: string = new Collection().fromJSON(body).id;

		if (id) {
			await tedis.set(id, body);
			res.statusCode = 204;
		}
		res.end();
	});
}
