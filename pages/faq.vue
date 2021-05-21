<template>
	<div class="mt-20 mb-12">
		<h1 class="text-2xl pb-2">FAQ</h1>
		<p class="text-lg">Frequently asked questions</p>
	</div>
</template>

<script lang="ts">
	import { Component, Vue } from "nuxt-property-decorator";
	@Component({ name: "faq", middleware: ["resetCharacter"] })
	export default class FAQ extends Vue {}
</script>
