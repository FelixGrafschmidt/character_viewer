import { v4 } from "uuid";
import { mutation, createModule, Module } from "vuex-class-component";
import { Sortcriterion } from "~/models/enums/Sortcriterion";
import { Sortorder } from "~/models/enums/Sortorder";
import { Character } from "~/models/interfaces/Character";
import { List, newList } from "~/models/interfaces/List";

const VuexModule = createModule({
	strict: false,
	target: "nuxt",
	namespaced: "ListStore",
});

@Module()
export class ListStore extends VuexModule {
	// State
	list = newList("");

	// Mutations
	@mutation setList(list: List) {
		list.characters.forEach((character) => {
			if (!character.created) {
				character.created = new Date();
			}

			if (!character.attributeArray) {
				character.attributeArray = [];
			}
		});
		if (!list.sortorder || typeof list.sortorder === "number") {
			list.sortorder = Sortorder.DEFAULT;
		}
		if (!list.sortcriterion) {
			list.sortcriterion = Sortcriterion.CREATED;
		}
		this.list = list;
	}

	@mutation addCharacter({ character, index = -1 }: { character: Character; index: number }) {
		if (index !== -1) {
			this.list.characters[index] = character;
		} else {
			this.list.characters.push(character);
		}
	}

	@mutation deleteCharacter(character: Character) {
		const characters = this.list.characters.filter((characterInList) => {
			return character.id !== characterInList.id;
		});
		this.list.characters = characters;
	}

	@mutation sortListByName() {
		switch (this.list.sortorder) {
			case Sortorder.ASC:
				this.list.sortcriterion = Sortcriterion.NAME;
				this.list.characters.sort((a, b) => {
					if (a.name === b.name) {
						return a.created > b.created ? -1 : 1;
					}
					return a.name > b.name ? -1 : 1;
				});
				this.list.sortorder = Sortorder.DESC;
				break;
			case Sortorder.DESC:
				this.list.sortcriterion = Sortcriterion.CREATED;
				this.list.characters.sort((a, b) => {
					return a.created > b.created ? 1 : -1;
				});
				this.list.sortorder = Sortorder.DEFAULT;
				break;
			case Sortorder.DEFAULT:
				this.list.sortcriterion = Sortcriterion.NAME;
				this.list.characters.sort((a, b) => {
					if (a.name === b.name) {
						return a.created > b.created ? -1 : 1;
					}
					return a.name > b.name ? 1 : -1;
				});
				this.list.sortorder = Sortorder.ASC;
				break;
		}
	}

	@mutation sortListByOrigin() {
		switch (this.list.sortorder) {
			case Sortorder.ASC:
				this.list.sortcriterion = Sortcriterion.ORIGIN;
				this.list.characters.sort((a, b) => {
					if (a.origin === b.origin) {
						return a.created > b.created ? -1 : 1;
					}
					return a.origin > b.origin ? -1 : 1;
				});
				this.list.sortorder = Sortorder.DESC;
				break;
			case Sortorder.DESC:
				this.list.sortcriterion = Sortcriterion.CREATED;
				this.list.characters.sort((a, b) => {
					return a.created > b.created ? 1 : -1;
				});
				this.list.sortorder = Sortorder.DEFAULT;
				break;
			case Sortorder.DEFAULT:
				this.list.sortcriterion = Sortcriterion.ORIGIN;
				this.list.characters.sort((a, b) => {
					if (a.origin === b.origin) {
						return a.created > b.created ? -1 : 1;
					}
					return a.origin > b.origin ? 1 : -1;
				});
				this.list.sortorder = Sortorder.ASC;
				break;
		}
	}

	@mutation sortListByImages() {
		switch (this.list.sortorder) {
			case Sortorder.ASC:
				this.list.sortcriterion = Sortcriterion.IMAGES;
				this.list.characters.sort((a, b) => {
					if (a.images.length === b.images.length) {
						return a.created > b.created ? -1 : 1;
					}
					return a.images.length > b.images.length ? -1 : 1;
				});
				this.list.sortorder = Sortorder.DESC;
				break;
			case Sortorder.DESC:
				this.list.sortcriterion = Sortcriterion.CREATED;
				this.list.characters.sort((a, b) => {
					return a.created > b.created ? 1 : -1;
				});
				this.list.sortorder = Sortorder.DEFAULT;
				break;
			case Sortorder.DEFAULT:
				this.list.sortcriterion = Sortcriterion.IMAGES;
				this.list.characters.sort((a, b) => {
					if (a.images.length === b.images.length) {
						return a.created > b.created ? -1 : 1;
					}
					return a.images.length > b.images.length ? 1 : -1;
				});
				this.list.sortorder = Sortorder.ASC;
				break;
		}
	}

	@mutation resetListSorting() {
		this.list.characters.sort((a, b) => {
			return a.created > b.created ? 1 : -1;
		});
	}

	@mutation addAttributesToCharacters({ attributes, characters }: { attributes: Array<string>; characters: Array<string> }) {
		this.list.characters.forEach((character) => {
			if (characters.includes(character.id)) {
				attributes.forEach((attr) => {
					if (character.attributeArray.filter((a) => a.name === attr).length < 1) {
						character.attributeArray.push({ id: v4(), name: attr, value: "" });
					}
				});
			}
		});
	}
}
