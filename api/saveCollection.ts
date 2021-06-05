import redis from "redis";
import { Request, Response } from "express";

const client = redis.createClient(6378, "127.0.0.1");

export default function (req: Request, res: Response): void {
	res.statusCode = 404;

	if (req.body) {
		const id: string = req.body.id;

		if (id) {
			client.set(id, JSON.stringify(req.body), (err) => {
				if (err) {
					throw err;
				}
				res.statusCode = 204;
				res.end();
			});
		} else {
			res.end();
		}
	}
}
