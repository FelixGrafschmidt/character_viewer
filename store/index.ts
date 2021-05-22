import { Context } from "@nuxt/types";
import { action, createModule, createProxy, createSubModule, extractVuexModule, mutation } from "vuex-class-component";
import Vuex from "vuex";
import Vue from "vue";
import { Modal } from "~/models/enums/Modal";
import { newList } from "~/models/interfaces/List";

import { CollectionStore } from "~/store/CollectionStore";
import { ListStore } from "~/store/ListStore";
import { CharacterStore } from "~/store/CharacterStore";
import { ImageStore } from "~/store/ImageStore";

Vue.use(Vuex);

const VuexModule = createModule({
	strict: false,
	target: "nuxt",
});

export class MainStore extends VuexModule.With({}) {
	// Submodules
	collectionStore = createSubModule(CollectionStore);
	listStore = createSubModule(ListStore);
	characterStore = createSubModule(CharacterStore);
	imageStore = createSubModule(ImageStore);

	// State
	listToDelete = newList(undefined);
	modal = Modal.NONE;
	loading = false;
	mobileMode = "collection";

	// Getters
	get navigationPaths() {
		return {
			collection: `/${this.collectionStore.collection.id}`,
			list: `/${this.collectionStore.collection.id}/${this.listStore.list.id}`,
			character: `/${this.collectionStore.collection.id}/${this.listStore.list.id}/${this.characterStore.character.id}`,
			gallery: `/${this.collectionStore.collection.id}/${this.listStore.list.id}/gallery`,
			"gallery-character": `/${this.collectionStore.collection.id}/${this.listStore.list.id}/gallery/${this.characterStore.character.id}`,
		};
	}

	// Mutations
	@mutation setModal(modal: Modal) {
		this.modal = modal;
	}

	@mutation deactivateModal() {
		window.document.body.style.position = "static";
		window.document.body.style.overflow = "overlay";
		this.modal = Modal.NONE;
	}

	@mutation setLoading(loading: boolean) {
		this.loading = loading;
	}

	@mutation setMobileMode(mobileMode: string) {
		this.mobileMode = mobileMode;
	}

	// Actions
	@action async nuxtServerInit(_nuxtContext: Context) {}

	// @getter async navigationPaths() {
	// 	return await {
	// 		collection: `/${this.collectionStore.collection.id}`,
	// 		list: `/${this.collectionStore.collection.id}/${this.listStore.list.id}`,
	// 		character: `/${this.collectionStore.collection.id}/${this.listStore.list.id}/${this.characterStore.character.id}`,
	// 		gallery: `/${this.collectionStore.collection.id}/${this.listStore.list.id}/gallery`,
	// 		"gallery-character": `/${this.collectionStore.collection.id}/${this.listStore.list.id}/gallery/${this.characterStore.character.id}`,
	// 	};
	// }
}

// store.vuex.ts
export const store = new Vuex.Store({
	modules: {
		...extractVuexModule(MainStore),
	},
});

// Creating proxies.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const vxm = {
	main: createProxy(store, MainStore),
};
