import { v4 } from "uuid";
import { List } from "./List";

export class Collection {
	id: string;
	lists: Array<List>;

	constructor() {
		this.id = v4();
		this.lists = [];
	}
}
