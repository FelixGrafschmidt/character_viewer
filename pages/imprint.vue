<template>
	<div class="p-8 my-20">
		<h1 class="text-2xl pb-2">Imprint</h1>
		<p class="text-lg">Felix Grafschmidt</p>
	</div>
</template>

<script lang="ts">
	import { Component, Vue } from "nuxt-property-decorator";

	@Component({ name: "imprint", middleware: ["resetCharacter"] })
	export default class Imprint extends Vue {}
</script>
