<template>
	<div
		class="border-teal-700 border-l border-r flex items-center flex-col mr-px justify-around z-10 w-[8rem] dark:bg-gray-800 bg-gray-500"
	>
		<nuxt-link v-slot="{ navigate }" tag="h2" custom to="/imprint">
			<div
				class="border-t border-teal-700 cursor-pointer w-full text-center py-2"
				role="link"
				@click="navigate"
				@keypress.enter="navigate"
			>
				{{ $t("pages.imprint.heading") }}
			</div>
		</nuxt-link>
		<nuxt-link v-slot="{ navigate }" tag="h2" custom to="/faq">
			<div
				class="cursor-pointer w-full border-t border-teal-700 text-center py-2"
				role="link"
				@click="navigate"
				@keypress.enter="navigate"
			>
				{{ $t("pages.faq.heading") }}
			</div>
		</nuxt-link>
		<div class="cursor-pointer border-t border-teal-700 w-full text-center py-2" role="link" @click="$vxm.main.setModal(2)">
			{{ $t("modals.contact_us.title") }}
		</div>
	</div>
</template>

<script lang="ts">
	import { Component, Vue } from "nuxt-property-decorator";

	@Component({
		components: {},
		name: "MoeInfobox",
	})
	export default class MoeInfobox extends Vue {}
</script>
