/* eslint-disable no-array-constructor */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { getAccessorType, getterTree, mutationTree, actionTree } from "typed-vuex";

import axios from "@nuxtjs/axios";
import { ActionContext } from "vuex/types/index";
import { Context } from "@nuxt/types";
import { Collection, getHash, newCollection } from "~/models/interfaces/Collection";
import { List } from "~/models/interfaces/List";
import { Character, CharacterImage, newCharacterImage, SubCharacter } from "~/models/interfaces/Character";
import { Modal } from "~/models/enums/Modal";

export const state = () => ({
	collection: { id: "", lists: new Array<List>() },
	list: { id: "", name: "", characters: new Array<Character>() },
	character: {
		id: "",
		name: "",
		origin: "",
		images: new Array<CharacterImage>(),
		attributeArrays: new Map<string, string>(),
		subCharacterArrays: new Map<string, SubCharacter[]>(),
	},
	originalHash: "",
	listToDelete: { id: "", name: "", characters: new Array<Character>() },
	modal: Modal.NONE,
	loading: false,
	ready: false,
});

export type RootState = ReturnType<typeof state>;

export const getters = getterTree(state, {
	collection: (currentState) => currentState.collection,
	list: (currentState) => currentState.list,
	character: (currentState) => currentState.character,
	originalHash: (currentState) => currentState.originalHash,
	listToDelete: (currentState) => currentState.listToDelete,
	characterName: (currentState) => currentState.character.name,
	characterOrigin: (currentState) => currentState.character.origin,
	characterImages: (currentState) => currentState.character.images,
	modal: (currentState) => currentState.modal,
	loading: (currentState) => currentState.loading,
	ready: (currentState) => currentState.ready,
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
	renameList: (currentState, { name, id }) => {
		currentState.collection.lists.filter((list) => list.id === id)[0].name = name;
	},

	setCharacter: (currentState, newCharacter: Character) => {
		newCharacter.images.forEach((image) => {
			if (image.valid === undefined) {
				image.valid = true;
			}
		});
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
	addCharacterImage: (currentState, { src, valid }) => {
		currentState.character.images.push(
			newCharacterImage(src, currentState.character.images.filter((image) => image.main).length === 0, valid)
		);
	},
	designateImageAsInvalid: (currentState, img: CharacterImage) => {
		currentState.character.images.filter((image) => image === img)[0].valid = false;
	},
	removeCharacterImage: (currentState, index: number) => {
		if (currentState.character.images.length > 1 && currentState.character.images[index].main) {
			currentState.character.images.splice(index, 1);
			currentState.character.images[0].main = true;
		} else {
			currentState.character.images.splice(index, 1);
		}
	},
	setModal: (currentState, modal: Modal) => {
		currentState.modal = modal;
	},
	deactivateModal: (currentState) => {
		currentState.modal = Modal.NONE;
	},
	designateMainImage: (currentState, index: number) => {
		currentState.character.images.forEach((image, i) => {
			image.main = i === index;
		});
	},
	deleteCharacter: (currentState, character: Character) => {
		const characters = currentState.list.characters.filter((characterInList) => {
			return character.id !== characterInList.id;
		});
		currentState.list.characters = characters;
	},
	setLoading: (currentState, loading: boolean) => {
		currentState.loading = loading;
	},
	setReady: (currentState, ready: boolean) => {
		currentState.ready = ready;
	},
	setListToDelete: (currentState, list: List) => {
		currentState.listToDelete = list;
	},
	deleteList: (currentState, id) => {
		currentState.collection.lists = currentState.collection.lists.filter((list) => list.id !== id);
		if (currentState.list.id === id) {
			currentState.list = { id: "", name: "", characters: new Array<Character>() };
		}
	},
	initializeStore() {
		console.log("Store initialized");
	},
});
export const actions = actionTree(
	{ state, getters, mutations },
	{
		nuxtServerInit(_vuexContext: ActionContext<any, any>, _nuxtContext: Context): void {},
		async saveChanges(): Promise<void> {
			return await this.$axios.$post("saveCollection", this.app.$accessor.collection, { timeout: 1000 }).then(() => {
				this.app.$accessor.setCollection(this.app.$accessor.collection);
			});
		},
		async loadCollection(_vuexContext: ActionContext<any, any>) {
			const collectionId = localStorage.getItem("collectionId");
			if (collectionId) {
				await this.$axios
					.$get("loadCollection", {
						params: {
							id: collectionId,
						},
						timeout: 1000,
					})
					.then((response: Collection) => {
						this.app.$accessor.setCollection(response);
					})
					.catch((error) => {
						console.error(error);

						this.app.$accessor.setCollection(newCollection());
					})
					.finally(() => {
						this.app.$accessor.setReady(true);
					});
			} else {
				this.app.$accessor.setCollection(newCollection());
				this.app.$accessor.setReady(true);
			}
		},
	}
);

// This compiles to nothing and only serves to return the correct type of the accessor
export const accessorType = getAccessorType({
	state,
	getters,
	mutations,
	actions,
	modules: {},
});
