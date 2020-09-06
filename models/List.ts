import { v4 } from "uuid";
import { Character } from "./Character";

export class List {
	id: string = "";
	name: string = "";
	characters: Array<Character> = [];

	constructor() {
		return this;
	}

	init(name?: string): List {
		this.name = name || this.name;
		this.id = v4();
		return this;
	}
}
