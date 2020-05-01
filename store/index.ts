import { Character } from "~/models/Character";
import { Collection } from "~/models/Collection";
import { List } from "~/models/List";

export const state: StoreState = {
	character: new Character(),
	collection: new Collection(),
	list: new List(),
};

export const mutations = {
	setCharacter(character: Character): void {
		state.character = character;
	},
	setCollection(collection: Collection): void {
		state.collection = collection;
	},
	setList(list: List): void {
		state.list = list;
	},
};

export interface StoreState {
	character: Character;
	collection: Collection;
	list: List;
}
