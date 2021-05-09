import { v4 } from "uuid";

export interface CharacterImage {
	src: string;
	main: boolean;
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
	attributeArrays: Map<string, string>;
	subCharacterArrays: Map<string, Array<SubCharacter>>;
}

export function newCharacter(
	id = v4(),
	name = "",
	origin = "",
	images = [],
	attributeArrays = new Map<string, string>(),
	subCharacterArrays = new Map<string, Array<SubCharacter>>()
): Character {
	return { id, name, origin, images, attributeArrays, subCharacterArrays };
}

export function newCharacterImage(src = "", main = false): CharacterImage {
	return { src, main };
}
