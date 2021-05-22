import { action, createModule, mutation } from "vuex-class-component";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import axios, { NuxtAxiosInstance } from "@nuxtjs/axios";
import { Collection, getHash, newCollection } from "~/models/interfaces/Collection";
import { List, newList } from "~/models/interfaces/List";

const VuexModule = createModule({
	strict: false,
	target: "nuxt",
});

export class CollectionStore extends VuexModule.With({}) {
	// State
	collection = newCollection("");
	listToDelete = newList("");
	originalHash = "";
	ready = false;

	// Mutations
	@mutation setCollection(collection: Collection) {
		this.collection = collection;
		this.originalHash = getHash(collection);
	}

	@mutation addListToCollection(list: List) {
		this.collection.lists.push(list);
	}

	@mutation renameList({ id, name }: { id: string; name: string }) {
		this.collection.lists.filter((list) => list.id === id)[0].name = name;
	}

	@mutation setListToDelete(list: List) {
		this.listToDelete = list;
	}

	@mutation deleteList(id: string) {
		this.collection.lists = this.collection.lists.filter((list) => list.id !== id);
		// if (this.list.id === id) {
		// 	this.list = { id: "", name: "", characters: new Array<Character>(), sortorder: Sortorder.DEFAULT };
		// }
	}

	@mutation removeListFromCollection(id: string) {
		this.collection.lists = this.collection.lists.filter((list) => list.id !== id);
	}

	// Actions
	@action async saveChanges() {
		return await this.$store.$axios.post("saveCollection", this.collection, { timeout: 1000 }).then(() => {
			this.originalHash = getHash(this.collection);
		});
	}

	@action async loadCollection(axios: NuxtAxiosInstance) {
		let collectionId = window.localStorage.getItem("collectionId");
		const collection = newCollection();
		if (collectionId) {
			collection.id = collectionId;
			await axios
				.$get("loadCollection", {
					params: {
						id: collectionId,
					},
					timeout: 1000,
				})
				.then((response: Collection) => {
					collectionId = response.id;

					this.collection = response;
					this.originalHash = getHash(response);
				})
				.catch((error: Error) => {
					console.error(error);

					this.collection = collection;
					this.originalHash = getHash(collection);
				})
				.finally(() => {
					localStorage.setItem("collectionId", collectionId!);
					this.ready = true;
				});
		} else {
			this.collection = collection;
			this.originalHash = getHash(collection);
			localStorage.setItem("collectionId", collection.id);
			this.ready = true;
		}
	}
}
