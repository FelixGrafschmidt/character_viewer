import { Character } from "~/models/Character";
import { Collection } from "~/models/Collection";
import { List } from "~/models/List";

const store = {
	character: new Character(),
	collection: new Collection(),
	list: new List(),
};

export function state(): StoreState {
	return store;
}

export const mutations = {
	setCharacter(character: Character): void {
		store.character = character;
	},
	setCollection(collection: Collection): void {
		store.collection = collection;
	},
	setList(list: List): void {
		store.list = list;
	},
	addCharacterToList(character: Character, addToTop: boolean): void {
		if (addToTop) {
			store.list.characters.unshift(character);
		} else {
			store.list.characters.push(character);
		}
	},
};

export interface StoreState {
	character: Character;
	collection: Collection;
	list: List;
}
