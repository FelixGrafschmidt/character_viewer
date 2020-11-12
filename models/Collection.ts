import { v4 } from "uuid";
import { List } from "./List";

interface CollectionFromJSON {
	id: string;
	lists: Array<string>;
}

export class Collection {
	private _id: string = "";
	private _lists: Array<List> = [];

	constructor() {
		return this;
	}

	init(id?: string): Collection {
		this._id = id || v4();
		return this;
	}

	fromJSON(json: string): Collection {
		const parsedJSON = JSON.parse(JSON.parse(json)) as CollectionFromJSON;
		this._id = parsedJSON.id;
		this._lists = [];

		parsedJSON.lists.forEach((list: string) => {
			this._lists.push(new List().fromJSON(list));
		});
		return this;
	}

	toJSON(): string {
		const lists: Array<string> = [];
		this._lists.forEach((list) => {
			lists.push(list.toJSON());
		});
		return JSON.stringify({ id: this._id, lists });
	}

	get id(): string {
		return this._id;
	}

	set id(id: string) {
		this._id = id;
	}

	get lists(): Array<List> {
		return this._lists;
	}

	set lists(lists: Array<List>) {
		this._lists = lists;
	}
}
