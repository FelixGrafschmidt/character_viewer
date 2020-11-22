import { Context } from "@nuxt/types";

export default function (context: { isDesktop: boolean } & Context) {
	if (!context.isDesktop) {
		return context.redirect("/mobile", context.route.query);
	}
	if (context.store.state.list.id === "") {
		return context.redirect("/");
	}
}
