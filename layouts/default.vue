<template>
	<div class="flex flex-col min-h-screen justify-between">
		<MoeHeader class="h-16 fixed z-10" />
		<div class="flex">
			<MoeSidebar class="w-1/6 fixed h-full mt-16 mb-32" />
			<div v-if="$accessor.ready" class="w-5/6 ml-auto px-6 py-2 max-h-[36rem] 2xl:max-h-[50rem]">
				<nuxt />
			</div>
		</div>

		<MoeFooter class="h-16 fixed bottom-0 z-10 w-full" />
		<MoeModal />
		<div v-if="$accessor.loading"></div>
	</div>
</template>

<script lang="ts">
	// Vue basics
	import { Component, Vue } from "nuxt-property-decorator";
	@Component({
		name: "default",
	})
	export default class Default extends Vue {
		isLoading = false;

		mounted() {
			this.$accessor.loadCollection();
		}
	}
</script>

<style lang="postcss">
	@import url("https://fonts.googleapis.com/css2?family=Alfa+Slab+One&family=Lato&display=swap");
	.dark-mode {
		@apply text-gray-100 bg-gray-900;
	}
	.light-mode {
		@apply text-gray-900 bg-gray-100;
	}
	:root {
		font-family: "Lato", sans-serif;
	}

	.tooltip {
		@apply invisible absolute bg-white;
	}

	.has-tooltip:hover .tooltip {
		@apply visible z-50;
	}

	body {
		@apply scrollbar;
		@apply scrollbar-thin;
		@apply scrollbar-track-gray-300;
		@apply scrollbar-thumb-gray-500;
		@apply dark:scrollbar-track-gray-800;
		@apply dark:scrollbar-thumb-gray-500;
		@apply overflow-y-scroll;
	}
</style>
