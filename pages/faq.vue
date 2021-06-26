<template>
	<div class="mt-4">
		<h1 class="text-2xl pb-2">{{ $t("pages.faq.heading") }}</h1>
		<p class="text-lg">{{ $t("pages.faq.content") }}</p>
	</div>
</template>

<script lang="ts">
	import { Component, Vue } from "nuxt-property-decorator";

	@Component({ name: "faq", middleware: ["resetCharacter"] })
	export default class FAQ extends Vue {}
</script>
