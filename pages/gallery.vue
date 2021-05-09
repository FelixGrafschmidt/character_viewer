<template>
	<div
		class="flex h-full flex-wrap gap-2 overflow-y-scroll scrollbar scrollbar-thin scrollbar-track-gray-300 scrollbar-thumb-gray-400 dark:scrollbar-track-gray-500 dark:scrollbar-thumb-gray-700 max-h-[71vh]"
	>
		<figure v-for="(image, i) in getImages()" :key="i" class="w-[30%]">
			<img :src="image.src" :alt="i" class="" />
		</figure>
	</div>
</template>

<script lang="ts">
	// Vue basics
	import { Component, Vue } from "nuxt-property-decorator";
	import { CharacterImage } from "~/models/interfaces/Character";
	@Component({
		components: {},
		name: "gallery",
		middleware: "routeguard",
	})
	export default class Gallery extends Vue {
		getImages() {
			const characters = this.$accessor.list.characters;
			const images: Array<CharacterImage> = [];

			characters.forEach((character) => {
				const mainImage = character.images.filter((image) => {
					return image.main;
				})[0];
				if (mainImage) {
					images.push(mainImage);
				}
			});
			return images;
		}
	}
</script>
