import * as http from "http";
import * as createServer from "connect";
import { Tedis } from "tedis";
import { Collection } from "~/models/Collection";

const tedis = new Tedis({
	host: "127.0.0.1",
	port: 6378,
});

export default function (req: createServer.IncomingMessage, res: http.ServerResponse, _next: createServer.NextFunction): void {
	let body: string = "";

	req.on("data", async (chunk: string) => {
		body += chunk;

		const id: string = (JSON.parse(body) as Collection).id;

		if (id) {
			await tedis.set(id, body);
			res.end();
		} else {
			res.statusCode = 404;
			res.end();
		}
	});
}
