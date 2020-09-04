import { v4 } from "uuid";
import { Character } from "./Character";

export class List {
	id: string;
	name: string;
	characters: Array<Character>;

	constructor(name: string, characters: Array<Character>) {
		this.id = v4();
		this.name = name;
		this.characters = characters;
	}
}
