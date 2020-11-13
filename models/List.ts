import { v4 } from "uuid";
import { Character } from "./Character";

interface ListFromJSON {
	id: string;
	name: string;
	characters: Array<string>;
}

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

	fromJSON(json: string): List {
		const parsedJSON = JSON.parse(json) as ListFromJSON;
		this.id = parsedJSON.id;
		this.name = parsedJSON.name;
		this.characters = [];
		(parsedJSON.characters || []).forEach((character) => {
			this.characters.push(new Character().fromJSON(character));
		});
		return this;
	}

	toJSON(): string {
		const characters: Array<string> = [];
		this.characters.forEach((character) => {
			characters.push(character.toJSON());
		});
		return JSON.stringify({ id: this.id, name: this.id, characters });
	}
}
