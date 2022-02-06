<template>
	<div class="flex flex-col min-h-screen justify-between">
		<MoeHeader class="h-16 fixed z-10 border-b border-teal-700" />
		<div class="flex">
			<MoeSidebar class="w-1/6 fixed h-full mt-16 mb-32 border-r border-teal-700" />
			<div
				v-if="$vxm.main.collectionStore.ready"
				class="scroll-padding content-height w-5/6 ml-auto px-6 max-h-full mt-16 scrollbar-thin scrollbar-track-gray-300 scrollbar-thumb-gray-500 dark:scrollbar-track-gray-800 dark:scrollbar-thumb-gray-500 overflow-y-scroll"
			>
				<nuxt />
			</div>
		</div>

		<MoeFooter class="h-16 fixed bottom-0 z-10 w-full border-t border-teal-700" />
		<MoeModal />
		<div v-if="$vxm.main.loading"></div>
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
			this.$vxm.main.collectionStore.loadCollection(this.$axios);
		}
	}
</script>

<style lang="postcss">
	/* vietnamese */
	@font-face {
		font-family: "Alfa Slab One";
		font-style: normal;
		font-weight: 400;
		font-display: swap;
		src: url(@/assets/fonts/6NUQ8FmMKwSEKjnm5-4v-4Jh2d1he-Wv.woff2) format("woff2");
		unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+1EA0-1EF9, U+20AB;
	}
	/* latin-ext */
	@font-face {
		font-family: "Alfa Slab One";
		font-style: normal;
		font-weight: 400;
		font-display: swap;
		src: url(@/assets/fonts/6NUQ8FmMKwSEKjnm5-4v-4Jh2dxhe-Wv.woff2) format("woff2");
		unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
	}
	/* latin */
	@font-face {
		font-family: "Alfa Slab One";
		font-style: normal;
		font-weight: 400;
		font-display: swap;
		src: url(@/assets/fonts/6NUQ8FmMKwSEKjnm5-4v-4Jh2dJhew.woff2) format("woff2");
		unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191,
			U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
	}
	/* latin-ext */
	@font-face {
		font-family: "Lato";
		font-style: normal;
		font-weight: 400;
		font-display: swap;
		src: url(@/assets/fonts/S6uyw4BMUTPHjxAwXjeu.woff2) format("woff2");
		unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
	}
	/* latin */
	@font-face {
		font-family: "Lato";
		font-style: normal;
		font-weight: 400;
		font-display: swap;
		src: url(@/assets/fonts/S6uyw4BMUTPHjx4wXg.woff2) format("woff2");
		unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191,
			U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
	}
	.dark {
		@apply text-gray-100 bg-gray-900;
	}

	:root {
		font-family: "Lato", sans-serif;
	}

	.content-height {
		height: calc(100vh - theme("height.32"));
	}
</style>

<style lang="postcss" scoped>
	.scroll-padding {
		scroll-padding-top: 3rem;
	}
</style>
