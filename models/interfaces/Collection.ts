import { v4 } from "uuid";
import hash from "object-hash";
import { List } from "./List";

export interface Collection {
	id: string;
	lists: Array<List>;
}

export function newCollection(id = v4(), lists = []): Collection {
	return { id, lists };
}

export function getHash(collection: Collection) {
	return hash(collection);
}
