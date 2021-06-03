import * as http from "http";
import * as createServer from "connect";
import redis from "redis";

const client = redis.createClient(6378, "127.0.0.1");

export default function (req: createServer.IncomingMessage, res: http.ServerResponse): void {
	let body: string = "";
	res.statusCode = 404;

	req.on("data", (chunk: string) => {
		body += chunk;

		const id: string = (JSON.parse(body) as { id: string }).id;

		if (id) {
			client.set(id, body, (err) => {
				if (err) {
					throw err;
				}
				res.statusCode = 204;
				res.end();
			});
		} else {
			res.end();
		}
	});
}
