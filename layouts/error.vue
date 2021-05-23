<template>
	<div class="mt-20">
		<div class="mb-4">
			<h1 v-if="error.statusCode === 404" class="text-lg">{{ error.message }}</h1>
			<h1 v-else class="text-lg">{{ $t("errors.generic_error") }}</h1>
		</div>
		<nuxt-link to="/">{{ $t("navigation.to_index") }}</nuxt-link>
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
