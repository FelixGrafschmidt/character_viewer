import { List } from "./List";

export class Collection {
	id: string;
	lists: Array<List>;

	constructor() {
		this.id = "";
		this.lists = [];
	}
}
