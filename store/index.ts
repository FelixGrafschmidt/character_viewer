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
import { Sortorder } from "~/models/enums/Sortorder";

export const state = () => ({
	collection: { id: "", lists: new Array<List>() },
	list: { id: "", name: "", characters: new Array<Character>(), sortorder: Sortorder.DEFAULT },
	character: {
		id: "",
		name: "",
		created: new Date(),
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
	navigationPaths: (currentState) => {
		return {
			list: `/lists/${currentState.list.id}`,
			character: `/lists/${currentState.list.id}/${currentState.character.id}`,
			gallery: `/lists/${currentState.list.id}/gallery`,
			"gallery-character": `/lists/${currentState.list.id}/gallery/${currentState.character.id}`,
		};
	},
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
		newList.characters.forEach((character) => {
			if (!character.created) {
				character.created = new Date();
			}
		});
		if (!newList.sortorder) {
			newList.sortorder = Sortorder.DEFAULT;
		}
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

	resetCharacter: (currenState) => {
		currenState.character = {
			id: "",
			name: "",
			created: new Date(),
			origin: "",
			images: new Array<CharacterImage>(),
			attributeArrays: new Map<string, string>(),
			subCharacterArrays: new Map<string, SubCharacter[]>(),
		};
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
	sortListByName: (currentState) => {
		switch (currentState.list.sortorder) {
			case Sortorder.ASCENDING:
				currentState.list.characters.sort((a, b) => {
					if (a.name === b.name) {
						return a.created > b.created ? -1 : 1;
					}
					return a.name > b.name ? -1 : 1;
				});
				currentState.list.sortorder = Sortorder.DESCENDING;
				break;
			case Sortorder.DESCENDING:
				currentState.list.characters.sort((a, b) => {
					return a.created > b.created ? 1 : -1;
				});
				currentState.list.sortorder = Sortorder.DEFAULT;
				break;
			case Sortorder.DEFAULT:
				currentState.list.characters.sort((a, b) => {
					if (a.name === b.name) {
						return a.created > b.created ? -1 : 1;
					}
					return a.name > b.name ? 1 : -1;
				});
				currentState.list.sortorder = Sortorder.ASCENDING;
				break;
		}
	},
	sortListByOrigin: (currentState) => {
		switch (currentState.list.sortorder) {
			case Sortorder.ASCENDING:
				currentState.list.characters.sort((a, b) => {
					if (a.origin === b.origin) {
						return a.created > b.created ? -1 : 1;
					}
					return a.origin > b.origin ? -1 : 1;
				});
				currentState.list.sortorder = Sortorder.DESCENDING;
				break;
			case Sortorder.DESCENDING:
				currentState.list.characters.sort((a, b) => {
					return a.created > b.created ? 1 : -1;
				});
				currentState.list.sortorder = Sortorder.DEFAULT;
				break;
			case Sortorder.DEFAULT:
				currentState.list.characters.sort((a, b) => {
					if (a.origin === b.origin) {
						return a.created > b.created ? -1 : 1;
					}
					return a.origin > b.origin ? 1 : -1;
				});
				currentState.list.sortorder = Sortorder.ASCENDING;
				break;
		}
	},
	resetListSorting: (currentState) => {
		currentState.list.characters.sort((a, b) => {
			return a.created > b.created ? 1 : -1;
		});
	},
	deleteList: (currentState, id) => {
		currentState.collection.lists = currentState.collection.lists.filter((list) => list.id !== id);
		if (currentState.list.id === id) {
			currentState.list = { id: "", name: "", characters: new Array<Character>(), sortorder: Sortorder.DEFAULT };
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
			let collectionId = localStorage.getItem("collectionId");
			const collection = newCollection();
			if (collectionId) {
				await this.$axios
					.$get("loadCollection", {
						params: {
							id: collectionId,
						},
						timeout: 1000,
					})
					.then((response: Collection) => {
						collectionId = response.id;
						this.app.$accessor.setCollection(response);
					})
					.catch((error) => {
						console.error(error);

						this.app.$accessor.setCollection(collection);
					})
					.finally(() => {
						localStorage.setItem("collectionId", collectionId!);
						this.app.$accessor.setReady(true);
					});
			} else {
				this.app.$accessor.setCollection(collection);
				localStorage.setItem("collectionId", collection.id);
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
