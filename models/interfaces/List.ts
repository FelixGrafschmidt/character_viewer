import { v4 } from "uuid";
import { Character } from "../interfaces/Character";

export interface List {
	id: string;
	name: string;
	characters: Array<Character>;
}

export function newList(id = v4(), name = "", characters = []): List {
	return { id, name, characters };
}
