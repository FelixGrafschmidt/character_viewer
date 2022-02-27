/* eslint-disable no-array-constructor */
import * as url from "url";
import { Request, Response } from "express";
import redis from "redis";
import { v4 } from "uuid";

const port = parseInt(process.env.REDIS_PORT || "6378")

const client = redis.createClient(port, "127.0.0.1");

export default function (req: Request, res: Response): void {
	let collection = { id: v4(), lists: new Array<any>() };
	try {
		const params: url.URLSearchParams = new url.URL(req.originalUrl!, "https://localhost").searchParams;

		res.setHeader("Content-Type", "application/json");
		res.statusCode = 404;

		const id: string = params.get("id") || "";
		if (id) {
			collection = { id, lists: [] };
			client.exists(id, (err) => {
				if (err) {
					throw err;
				}
				client.get(id, (err, response) => {
					if (err) {
						throw err;
					}
					if (typeof response === "string") {
						collection = JSON.parse(response) as { id: string; lists: Array<any> };
						res.statusCode = 200;
					}

					res.end(JSON.stringify(collection));
				});
			});
		} else {
			res.end(JSON.stringify(collection));
		}
	} catch (error) {
		console.error(error);
		res.end(JSON.stringify(collection));
	}
}
