import { getAccessorType, getterTree, mutationTree, actionTree } from "typed-vuex";

import { Collection } from "~/models/Collection";
import { List } from "~/models/List";
import { Character } from "~/models/Character";

export const state = () => ({
	collection: new Collection(""),
	list: new List(),
	character: new Character(),
});

export type RootState = ReturnType<typeof state>;

export const getters = getterTree(state, {
	collection: (state) => state.collection,
	list: (currentState) => currentState.list,
	character: (currentState) => currentState.character,
});

export const mutations = mutationTree(state, {
	setCollection: (currentState, newCollection: Collection) => (currentState.collection = newCollection),
	setList: (currentState, newList: List) => (currentState.list = newList),
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
