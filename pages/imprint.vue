<template>
	<div class="mt-4">
		<h1 class="text-2xl pb-2">{{ $t("pages.imprint.heading") }}</h1>
		<p class="text-lg">Felix Grafschmidt</p>
	</div>
</template>

<script lang="ts">
	import { Component, Vue } from "nuxt-property-decorator";

	@Component({ name: "imprint", middleware: ["resetCharacter"] })
	export default class Imprint extends Vue {}
</script>
