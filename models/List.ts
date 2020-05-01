import { Character } from "./Character";

export class List {
	id: string;
	name: string;
	characters: Array<Character>;

	constructor() {
		this.id = "";
		this.name = "";
		this.characters = [];
	}
}
