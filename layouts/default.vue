<template>
	<div class="main-layout h-screen">
		<MoeHeader class="navbar" />
		<MoeSidebar class="side-nav" />
		<div v-if="$accessor.ready" class="content">
			<nuxt class="px-8 py-8" />
		</div>
		<MoeFooter class="footer" />
		<MoeModal />
		<div v-if="$accessor.loading"></div>
	</div>
</template>

<script lang="ts">
	// Vue basics
	import { Component, Vue } from "nuxt-property-decorator";
	@Component({ name: "default" })
	export default class Default extends Vue {
		isLoading = false;

		mounted() {}
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
	.main-layout {
		display: grid;
		grid-template-columns: 0.3fr 1.7fr;
		grid-template-rows: 0.2fr 2.7fr 0.1fr;
		gap: 0px 0px;
		grid-template-areas:
			"navbar navbar"
			"side-nav content"
			"footer footer";
	}
	.content {
		grid-area: content;
	}
	.navbar {
		grid-area: navbar;
	}
	.side-nav {
		grid-area: side-nav;
	}
	.side-nav {
		grid-area: side-nav;
	}
	.footer {
		grid-area: footer;
	}
</style>
