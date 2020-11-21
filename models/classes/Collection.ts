import { v4 } from "uuid";
import { List } from "./List";

interface CollectionFromJSON {
	id: string;
	lists: Array<string>;
}

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

	fromJSON(json: string): Collection {
		const parsedJSON = JSON.parse(JSON.parse(json)) as CollectionFromJSON;
		this.id = parsedJSON.id;
		this.lists = [];

		parsedJSON.lists.forEach((list: string) => {
			this.lists.push(new List().fromJSON(list));
		});
		return this;
	}

	toJSON(): string {
		const lists: Array<string> = [];
		this.lists.forEach((list) => {
			lists.push(list.toJSON());
		});
		return JSON.stringify({ id: this.id, lists });
	}
}
