import { Context } from "@nuxt/types";
import { Inject } from "@nuxt/types/app";
import { createProxy } from "vuex-class-component";
import { MainStore } from "~/store";

export default (context: Context, inject: Inject) => {
	const vxm = {
		main: createProxy(context.store, MainStore),
		axios: context.$axios,
	};

	inject("vxm", { ...vxm });
};
