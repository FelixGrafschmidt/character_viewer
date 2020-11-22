import { Context } from "@nuxt/types";

export default function (context: Context) {
	if (context.store.state.list.id === "") {
		return context.redirect("/");
	}
}
