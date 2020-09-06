import { v4 } from "uuid";
import { List } from "./List";

export class Collection {
	id: string = "";
	lists: Array<List> = [];

	constructor() {
		return this;
	}

	init(id?: string): Collection {
		this.id = id || v4();
		return this;
	}
}
