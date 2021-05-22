import { vxm } from "~/store";

declare module "vue/types/vue" {
	interface Vue {
		$vxm: typeof vxm;
	}
}

declare module "@nuxt/types" {
	interface NuxtAppOptions {
		$vxm: typeof vxm;
	}
}
