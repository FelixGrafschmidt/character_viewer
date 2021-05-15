<template>
	<div class="relative my-20">
		<div class="has-tooltip absolute top-[-1.5rem] left-[-1.5rem]">
			<MoeButton
				icon-class-names="fas fa-arrow-left"
				class="py-1 px-4 rounded-br-sm has-tooltip"
				class-names="text-sm font-medium focus:outline-none"
				color="dark:bg-gray-600 bg-gray-400"
				@click.native="$router.push($accessor.navigationPaths.gallery)"
			/>
			<span class="tooltip bg-gray-300 dark:bg-gray-500 p-2 ml-2 rounded w-40">Show all Characters</span>
		</div>
		<div class="flex flex-wrap gap-2 pt-2">
			<figure v-for="(image, i) in character.images" :key="i" class="w-[24%]">
				<img :src="image.src" :alt="image.src" class="overflow-hidden" />
			</figure>
		</div>
	</div>
</template>

<script lang="ts">
	// Vue basics
	import { Component, Vue } from "nuxt-property-decorator";
	@Component({
		components: {},
		name: "gallery",
		middleware: "routeguard",
	})
	export default class Gallery extends Vue {
		mode: string = "list";

		get character() {
			return this.$accessor.character;
		}
	}
</script>
