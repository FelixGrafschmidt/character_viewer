import { Context } from "@nuxt/types";
import { action, createModule, createProxy, createSubModule, extractVuexModule, Module, mutation } from "vuex-class-component";
import Vuex from "vuex";
import Vue from "vue";
import { Modal } from "~/models/enums/Modal";

import { CollectionStore } from "~/store/CollectionStore";
import { ListStore } from "~/store/ListStore";
import { CharacterStore } from "~/store/CharacterStore";
Vue.use(Vuex);

const VuexModule = createModule({
	strict: false,
	target: "nuxt",
	namespaced: "MainStore",
});

@Module()
export class MainStore extends VuexModule {
	// Submodules
	collectionStore = createSubModule(CollectionStore);
	listStore = createSubModule(ListStore);
	characterStore = createSubModule(CharacterStore);

	// State
	modal = Modal.NONE;
	loading = false;
	mobileMode = "collection";
	scrollID = "";
	tutorial = 1;

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
		this.modal = Modal.NONE;
	}

	@mutation setLoading(loading: boolean) {
		this.loading = loading;
	}

	@mutation setMobileMode(mobileMode: string) {
		this.mobileMode = mobileMode;
	}

	@mutation setScrollID(scrollID: string) {
		this.scrollID = scrollID;
	}

	@mutation nextTutorial() {
		this.tutorial++;
	}

	@mutation previousTutorial() {
		this.tutorial--;
	}

	@mutation setTutorial(tutorial: number) {
		this.tutorial = tutorial;
	}

	// Actions
	@action async nuxtServerInit(_nuxtContext: Context) {}
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
