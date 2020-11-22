/* eslint-disable no-array-constructor */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { getAccessorType, getterTree, mutationTree, actionTree } from "typed-vuex";

import axios from "@nuxtjs/axios";
import { ModalProgrammatic as Modal } from "buefy";
import { Collection, getHash } from "~/models/interfaces/Collection";
import { List } from "~/models/interfaces/List";
import { Character, CharacterImage, SubCharacter } from "~/models/interfaces/Character";

export const state = () => ({
	collection: { id: "", lists: new Array<List>() },
	list: { id: "", name: "", characters: new Array<Character>() },
	character: { id: "", name: "", origin: "", images: new Array<CharacterImage>(), attributeArrays: new Map<string, string>(), subCharacterArrays: new Map<string, SubCharacter[]>() },
	originalHash: "",
});

export type RootState = ReturnType<typeof state>;

export const getters = getterTree(state, {
	collection: (currentState) => currentState.collection,
	list: (currentState) => currentState.list,
	character: (currentState) => currentState.character,
	originalHash: (currentState) => currentState.originalHash,
	characterName: (currentState) => currentState.character.name,
	characterOrigin: (currentState) => currentState.character.origin,
	characterImages: (currentState) => currentState.character.images,
});

export const mutations = mutationTree(state, {
	setCollection: (currentState, newCollection: Collection) => {
		currentState.collection = newCollection;
		currentState.originalHash = getHash(newCollection);
	},
	addListToCollection: (currentState, newList: List) => {
		currentState.collection.lists.push(newList);
	},
	removeListFromCollection: (currentState, id: string) => {
		currentState.collection.lists.filter((list) => list.id !== id);
	},

	setList: (currentState, newList: List) => {
		currentState.list = newList;
	},
	renameList: (currentState, name: string) => {
		currentState.list.name = name;
	},

	setCharacter: (currentState, newCharacter: Character) => {
		currentState.character = newCharacter;
	},

	addCharacter: (currentState, { newCharacter, index = -1 }) => {
		if (index !== -1) {
			currentState.list.characters[index] = newCharacter;
		} else {
			currentState.list.characters.push(newCharacter);
		}
	},
	changeCharacterName: (currentState, name: string) => {
		currentState.character.name = name;
	},
	changeCharacterOrigin: (currentState, origin: string) => {
		currentState.character.origin = origin;
	},
	addCharacterImage: (currentState, image: CharacterImage) => {
		currentState.character.images.push(image);
	},
	removeCharacterImage: (currentState, index: number) => {
		currentState.character.images.splice(index, 1);
	},
	designateMainImage: (currentState, index: number) => {
		currentState.character.images.forEach((image, i) => {
			image.main = i === index;
		});
	},
	deleteCharacter: (currentState, character: Character) => {
		const newList = currentState.list.characters.filter((characterInList) => {
			return character.id !== characterInList.id;
		});
		currentState.list.characters = newList;
	},

	initializeStore() {
		console.log("Store initialized");
	},
});
export const actions = actionTree(
	{ state, getters, mutations },
	{
		async saveChanges(): Promise<void> {
			return await this.$axios.$post("saveCollection", this.app.$accessor.collection).then(() => {
				this.app.$accessor.setCollection(this.app.$accessor.collection);
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
