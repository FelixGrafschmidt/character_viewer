/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { getAccessorType, getterTree, mutationTree, actionTree } from "typed-vuex";

import axios from "@nuxtjs/axios";
import { Collection } from "~/models/Collection";
import { List } from "~/models/List";
import { Character } from "~/models/Character";

export const state = () => ({
	collection: new Collection(),
	list: new List(),
	character: new Character(),
	changes: false,
});

export type RootState = ReturnType<typeof state>;

export const getters = getterTree(state, {
	collection: (currentState) => currentState.collection,
	list: (currentState) => currentState.list,
	character: (currentState) => currentState.character,
	changes: (currentState) => currentState.changes,
});

export const mutations = mutationTree(state, {
	setCollection: (currentState, newCollection: Collection) => (currentState.collection = newCollection),
	addListToCollection: (currentState, newList: List) => currentState.collection.lists.push(newList),
	removeListFromCollection: (currentState, id: string) => currentState.collection.lists.filter((list) => list.id !== id),

	setList: (currentState, newList: List) => (currentState.list = newList),
	renameList: (currentState, { id, name }) =>
		currentState.collection.lists.filter((list) => {
			if (list.id === id) {
				list.name = name;
			}
		}),

	setCharacter: (currentState, newCharacter: Character) => (currentState.character = newCharacter),

	setChanges: (currentState, newChanges: boolean) => (currentState.changes = newChanges),

	initializeStore() {
		// eslint-disable-next-line no-console
		console.log("Store initialized");
	},
});
export const actions = actionTree(
	{ state, getters, mutations },
	{
		async saveChanges(): Promise<void> {
			return await this.$axios.$post("/saveCollection", JSON.stringify(this.app.$accessor.collection)).then(() => {
				this.app.$accessor.setChanges(false);
			});
		},
	},
);

// This compiles to nothing and only serves to return the correct type of the accessor
export const accessorType = getAccessorType({
	state,
	getters,
	mutations,
	actions,
	modules: {},
});
