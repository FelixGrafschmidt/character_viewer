<template>
	<div
		class="border-teal-700 border-l border-r flex items-center flex-col mr-px justify-around z-10 w-[8rem] dark:bg-gray-800 bg-gray-500"
	>
		<div v-for="locale in $i18n.locales" :key="locale.code" class="w-full">
			<div
				v-if="locale.code !== $i18n.locale"
				@click="changeLocale(locale)"
				class="cursor-pointer w-full text-center py-2 border-t border-teal-700"
			>
				{{ locale.code.toUpperCase() }}
			</div>
		</div>
		<!-- <nuxt-link v-slot="{ navigate }" tag="h2" custom to="/imprint">
			<div
				class="border-b border-teal-700 cursor-pointer w-full text-center py-2"
				role="link"
				@click="navigate"
				@keypress.enter="navigate"
			>
				{{ $t("pages.imprint.heading") }}
			</div>
		</nuxt-link>
		<nuxt-link v-slot="{ navigate }" tag="h2" custom to="/faq">
			<div
				class="cursor-pointer w-full border-b border-teal-700 text-center py-2"
				role="link"
				@click="navigate"
				@keypress.enter="navigate"
			>
				{{ $t("pages.faq.heading") }}
			</div>
		</nuxt-link>
		<h2>
			<div class="cursor-pointer w-full text-center py-2" role="link" @click="$vxm.main.setModal(2)">
				{{ $t("modals.contact_us.title") }}
			</div>
		</h2> -->
	</div>
</template>

<script lang="ts">
	import { LocaleObject } from "@nuxtjs/i18n";
	import { Component, Vue } from "nuxt-property-decorator";

	@Component({
		components: {},
		name: "MoeLangSwitcher",
	})
	export default class MoeLangSwitcher extends Vue {
		changeLocale(locale: LocaleObject) {
			this.$i18n.setLocale(locale.code);
		}
	}
</script>
