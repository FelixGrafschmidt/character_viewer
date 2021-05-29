import { v4 } from "uuid";

export interface CharacterImage {
	src: string;
	main: boolean;
	valid: boolean;
}

export interface CharacterAttribute {
	name: string;
	value: string;
	id: string;
}

export interface SubCharacter {
	id: string;
	name: string;
	origin: string;
	images: Array<CharacterImage>;
	attributeArrays: Map<string, string>;
}

export interface Character {
	id: string;
	name: string;
	origin: string;
	images: Array<CharacterImage>;
	created: Date;
	attributeArray: Array<CharacterAttribute>;
	subCharacterArrays: Map<string, Array<SubCharacter>>;
}

export function newCharacter(
	id = v4(),
	name = "",
	origin = "",
	created = new Date(),
	images = [],
	attributeArray = [],
	subCharacterArrays = new Map<string, Array<SubCharacter>>()
): Character {
	return { id, name, origin, images, created, attributeArray, subCharacterArrays };
}

export function newCharacterImage(src = "", main = false, valid = true): CharacterImage {
	return { src, main, valid };
}
