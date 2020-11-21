<template>
	<div class="gallery columns is-multiline">
		<figure v-for="(image, i) in getImages()" :key="i" class="column is-one-third">
			<img class="" :src="image.src" :alt="i" />
		</figure>
		<figure v-for="(image, i) in getImages()" :key="i" class="column is-one-third">
			<img class="" :src="image.src" :alt="i" />
		</figure>
		<figure v-for="(image, i) in getImages()" :key="i" class="column is-one-third">
			<img class="" :src="image.src" :alt="i" />
		</figure>
		<figure v-for="(image, i) in getImages()" :key="i" class="column is-one-third">
			<img class="" :src="image.src" :alt="i" />
		</figure>
		<figure v-for="(image, i) in getImages()" :key="i" class="column is-one-third">
			<img class="" :src="image.src" :alt="i" />
		</figure>
		<figure v-for="(image, i) in getImages()" :key="i" class="column is-one-third">
			<img class="" :src="image.src" :alt="i" />
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

<style lang="scss" scoped>
	.gallery {
		max-height: 85vh;
		min-height: 85vh;
		overflow: auto;
	}
	.gallery::-webkit-scrollbar {
		width: 0.2em;
	}
	.gallery::-webkit-scrollbar-track {
		-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
		box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
	}
	.gallery::-webkit-scrollbar-thumb {
		background-color: var(--color-secondary);
		outline: 1px solid black;
	}
</style>
