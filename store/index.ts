/* eslint-disable no-array-constructor */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { getAccessorType, getterTree, mutationTree, actionTree } from "typed-vuex";

import axios from "@nuxtjs/axios";
import { ModalProgrammatic as Modal } from "buefy";
import { Collection } from "~/models/interfaces/Collection";
import { List } from "~/models/interfaces/List";
import { Character } from "~/models/interfaces/Character";

export const state = () => ({
	collection: { id: "", lists: new Array<List>() },
	list: { id: "", name: "", characters: new Array<Character>() },
	character: {},
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
	renameList: (currentState, name: string) => {
		currentState.list.name = name;
	},

	setCharacter: (currentState, newCharacter: Character) => (currentState.character = newCharacter),

	setChanges: (currentState, newChanges: boolean) => (currentState.changes = newChanges),

	addCharacter: (currentState, newCharacter: Character) => currentState.list.characters.push(newCharacter),

	initializeStore() {
		console.log("Store initialized");
	},
});
export const actions = actionTree(
	{ state, getters, mutations },
	{
		async saveChanges(): Promise<void> {
			return await this.$axios.$post("/saveCollection", this.app.$accessor.collection).then(() => {
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
