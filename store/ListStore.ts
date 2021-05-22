import { mutation, createModule, Module } from "vuex-class-component";
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
		});
		if (!list.sortorder) {
			list.sortorder = Sortorder.DEFAULT;
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
			case Sortorder.ASCENDING:
				this.list.characters.sort((a, b) => {
					if (a.name === b.name) {
						return a.created > b.created ? -1 : 1;
					}
					return a.name > b.name ? -1 : 1;
				});
				this.list.sortorder = Sortorder.DESCENDING;
				break;
			case Sortorder.DESCENDING:
				this.list.characters.sort((a, b) => {
					return a.created > b.created ? 1 : -1;
				});
				this.list.sortorder = Sortorder.DEFAULT;
				break;
			case Sortorder.DEFAULT:
				this.list.characters.sort((a, b) => {
					if (a.name === b.name) {
						return a.created > b.created ? -1 : 1;
					}
					return a.name > b.name ? 1 : -1;
				});
				this.list.sortorder = Sortorder.ASCENDING;
				break;
		}
	}

	@mutation sortListByOrigin() {
		switch (this.list.sortorder) {
			case Sortorder.ASCENDING:
				this.list.characters.sort((a, b) => {
					if (a.origin === b.origin) {
						return a.created > b.created ? -1 : 1;
					}
					return a.origin > b.origin ? -1 : 1;
				});
				this.list.sortorder = Sortorder.DESCENDING;
				break;
			case Sortorder.DESCENDING:
				this.list.characters.sort((a, b) => {
					return a.created > b.created ? 1 : -1;
				});
				this.list.sortorder = Sortorder.DEFAULT;
				break;
			case Sortorder.DEFAULT:
				this.list.characters.sort((a, b) => {
					if (a.origin === b.origin) {
						return a.created > b.created ? -1 : 1;
					}
					return a.origin > b.origin ? 1 : -1;
				});
				this.list.sortorder = Sortorder.ASCENDING;
				break;
		}
	}

	@mutation resetListSorting() {
		this.list.characters.sort((a, b) => {
			return a.created > b.created ? 1 : -1;
		});
	}
}
