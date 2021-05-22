<template>
	<div class="relative mt-20 mb-12">
		<MoeBackButton :tooltip-text="'Back to Gallery'" @back="$router.push($accessor.navigationPaths.gallery)" />
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
		name: "gallery-character",
		middleware: ["resetCharacter"],
	})
	export default class GalleryCharacter extends Vue {
		mode: string = "list";

		mounted() {
			const url = new URL(window.location.href);
			const path = url.pathname.split("/");
			const listid = path[2];
			const characterid = path[4];
			const list = this.$accessor.collection.lists.filter((list) => list.id === listid);
			if (list.length === 0) {
				this.$router.push(this.$accessor.navigationPaths.collection);
			}
			this.$accessor.setList(list[0]);
			const character = this.$accessor.list.characters.filter((character) => character.id === characterid);
			if (character.length === 0) {
				this.$router.push("/lists/" + listid + "/new");
			} else {
				this.$accessor.setCharacter(character[0]);
			}
		}

		get character() {
			return this.$accessor.character;
		}
	}
</script>
