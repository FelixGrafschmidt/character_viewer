import { v4 } from "uuid";
import { Sortcriterion } from "../enums/Sortcriterion";
import { Sortorder } from "../enums/Sortorder";
import { Character } from "../interfaces/Character";

export interface List {
	id: string;
	name: string;
	characters: Array<Character>;
	sortcriterion: Sortcriterion;
	sortorder: Sortorder;
}

export function newList(id = v4(), name = "", characters = [], sortcriterion = Sortcriterion.CREATED, sortorder = Sortorder.DEFAULT): List {
	return { id, name, characters, sortcriterion, sortorder };
}
