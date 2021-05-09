<template>
	<div>
		<nuxt />
		<MoeModal />
	</div>
</template>

<script lang="ts">
	// Vue basics
	import { Component, Vue } from "nuxt-property-decorator";
	@Component({ name: "mobile" })
	export default class Mobile extends Vue {}
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
</style>
