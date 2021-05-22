<template>
	<div class="mt-20">
		<div class="mb-4">
			<h1 v-if="error.statusCode === 404" class="text-lg">{{ error.message }}</h1>
			<h1 v-else class="text-lg">An error occurred</h1>
		</div>
		<nuxt-link to="/">Back to Start</nuxt-link>
	</div>
</template>

<script lang="ts">
	// Vue basics
	import { Component, Prop, Vue } from "nuxt-property-decorator";
	import { NuxtError } from "@nuxt/types/app";
	@Component({ name: "error" })
	export default class Error extends Vue {
		@Prop({ required: true })
		error!: NuxtError;
	}
</script>
