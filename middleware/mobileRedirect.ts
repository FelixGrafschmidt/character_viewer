import { Context } from "@nuxt/types";
import { Device } from "@nuxtjs/device";

export default function (context: Context & { $device: Device }) {
	if (!context.$device.isDesktop) {
		return context.redirect("/mobile", context.route.query);
	}
}
