<template>
	<div class="my-20">
		<div class="flex flex-wrap gap-2 pt-2">
			<figure v-for="(character, i) in list.characters" :key="i" class="w-[24%] cursor-pointer" @click="selectCharacter(character)">
				<img :src="getMainImage(character).src" :alt="character.name" class="overflow-hidden" />
			</figure>
		</div>
	</div>
</template>

<script lang="ts">
	// Vue basics
	import { Component, Vue } from "nuxt-property-decorator";
	import { Character } from "~/models/interfaces/Character";
	@Component({
		components: {},
		name: "gallery",
	})
	export default class Gallery extends Vue {
		mode: string = "list";

		mounted() {
			const url = new URL(window.location.href);
			const path = url.pathname.split("/");
			const listid = path[2];
			const list = this.$accessor.collection.lists.filter((list) => list.id === listid);
			if (list.length === 0) {
				this.$router.push("/lists");
			}
			if (list[0].characters.length === 0) {
				this.$router.push("/lists/" + listid);
			}
			this.$accessor.setList(list[0]);
		}

		get list() {
			return this.$accessor.list;
		}

		getMainImage(character: Character) {
			return (
				character.images.filter((image) => {
					return image.main;
				})[0] || ""
			);
		}

		selectCharacter(character: Character) {
			this.mode = "characters";
			this.$accessor.setCharacter(character);
			this.$router.push(this.$accessor.navigationPaths["gallery-character"]);
		}
	}
</script>
