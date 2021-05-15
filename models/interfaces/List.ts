import { v4 } from "uuid";
import { Sortorder } from "../enums/Sortorder";
import { Character } from "../interfaces/Character";

export interface List {
	id: string;
	name: string;
	sortorder: Sortorder;
	characters: Array<Character>;
}

export function newList(id = v4(), name = "", characters = []): List {
	return { id, name, sortorder: Sortorder.DEFAULT, characters };
}
