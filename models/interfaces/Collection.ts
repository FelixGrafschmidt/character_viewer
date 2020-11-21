import { v4 } from "uuid";
import { List } from "./List";

export interface Collection {
	id: string;
	lists: Array<List>;
}

export function newCollection(id = v4(), lists = []): Collection {
	return { id, lists };
}
