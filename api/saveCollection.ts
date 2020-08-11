import * as http from "http";
import * as createServer from "connect";
import { Tedis } from "tedis";
import { Collection } from "~/models/Collection";

const tedis = new Tedis({
	host: "127.0.0.1",
	port: 6378,
});

export default async function (req: createServer.IncomingMessage, res: http.ServerResponse, _next: createServer.NextFunction): Promise<void> {
	let body: string = "";

	req.on("data", (chunk: string) => {
		body += chunk;
	});

	const id: string = (JSON.parse(body) as Collection).id;

	if (id) {
		if (await tedis.exists(id)) {
			res.end(await tedis.get(id));
		} else {
			await tedis.set(id, body);
			res.end();
		}
	} else {
		res.end();
	}
}
