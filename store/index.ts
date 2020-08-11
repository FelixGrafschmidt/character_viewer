import type { Context as AppContext } from "@nuxt/types";
import { ActionTree, ActionContext, MutationTree } from "vuex/types/index";
import { RootState } from "~/models/RootState";
import { Collection } from "~/models/Collection";
import { loadCollection } from "~/services/AjaxService";
export const state = (): RootState => ({ collection: new Collection("") });

export const mutations: MutationTree<RootState> = {
	setCollection(currentState: RootState, collection: Collection): void {
		currentState.collection = collection;
	},
	getCollection(currentState: RootState): Collection {
		return currentState.collection;
	},
};

interface Actions<S, R> extends ActionTree<S, R> {
	nuxtServerInit(actionContext: ActionContext<S, R>, appContext: AppContext): void;
}

export const actions: Actions<RootState, RootState> = {
	async nuxtServerInit({ commit }, context) {
		let collection: Collection = new Collection("");

		if (context.params.id) {
			await loadCollection(context.params.id).then((response) => {
				collection = response.data;
			});
		}

		commit("setCollection", collection);
	},
};
