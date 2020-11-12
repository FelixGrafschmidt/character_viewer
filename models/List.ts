import { v4 } from "uuid";
import { Character } from "./Character";

interface ListFromJSON {
	id: string;
	name: string;
	characters: Array<string>;
}

export class List {
	private _id: string = "";
	private _name: string = "";
	private _characters: Array<Character> = [];

	constructor() {
		return this;
	}

	init(name?: string): List {
		this._name = name || this._name;
		this._id = v4();
		return this;
	}

	fromJSON(json: string): List {
		const parsedJSON = JSON.parse(json) as ListFromJSON;
		this._id = parsedJSON.id;
		this._name = parsedJSON.name;
		this._characters = [];
		(parsedJSON.characters || []).forEach((character) => {
			this._characters.push(new Character().fromJSON(character));
		});
		return this;
	}

	toJSON(): string {
		const characters: Array<string> = [];
		this._characters.forEach((character) => {
			characters.push(character.toJSON());
		});
		return JSON.stringify({ id: this._id, name: this._id, characters });
	}

	get id() {
		return this._id;
	}

	set id(id: string) {
		this._id = id;
	}

	get name() {
		return this._name;
	}

	set name(name: string) {
		this._name = name;
	}

	get characters(): Array<Character> {
		return this._characters;
	}

	set characters(characters: Array<Character>) {
		this._characters = characters;
	}
}
