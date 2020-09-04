import { getAccessorType, getterTree, mutationTree, actionTree } from "typed-vuex";

import { v4 } from "uuid";
import { Collection } from "~/models/Collection";
import { List } from "~/models/List";
import { Character } from "~/models/Character";

export const state = () => ({
	collection: new Collection(""),
	list: new List("", []),
	character: new Character(),
});

export type RootState = ReturnType<typeof state>;

export const getters = getterTree(state, {
	collection: (currentState) => currentState.collection,
	list: (currentState) => currentState.list,
	character: (currentState) => currentState.character,
});

export const mutations = mutationTree(state, {
	initializeCollection: (currentState) => (currentState.collection = new Collection(v4())),
	setCollection: (currentState, newCollection: Collection) => (currentState.collection = newCollection),
	addListToCollection: (currentState, newList: List) => currentState.collection.push(newList),
	removeListFromCollection: (currentState, id: string) => currentState.collection.filter((list) => list.id !== id),

	setList: (currentState, newList: List) => (currentState.list = newList),
	renameList: (currentState, { id, name }) =>
		currentState.collection.filter((list) => {
			if (list.id === id) {
				list.name = name;
			}
		}),

	setCharacter: (currentState, newCharacter: Character) => (currentState.character = newCharacter),

	initializeStore() {
		// eslint-disable-next-line no-console
		console.log("Store initialized");
	},
});
export const actions = actionTree({ state, getters, mutations }, {});

// This compiles to nothing and only serves to return the correct type of the accessor
export const accessorType = getAccessorType({
	state,
	getters,
	mutations,
	actions,
	modules: {},
});
