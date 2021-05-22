<template>
	<div class="flex relative gap-4 max-h-[75vh] mt-20 mb-12" @click="quickImage">
		<MoeBackButton :tooltip-text="'Back to Character List'" @back="backToCharacterList" />

		<MoeCharacterImages />
		<MoeCharacterAttributes />
	</div>
</template>

<script lang="ts">
	// Vue basics
	import { Component, Vue } from "nuxt-property-decorator";
	import { newCharacter } from "~/models/interfaces/Character";
	@Component({
		name: "character",
	})
	export default class Character extends Vue {
		quickImages = false;

		get characters() {
			return this.$accessor.list.characters;
		}

		mounted() {
			const url = new URL(window.location.href);
			const path = url.pathname.split("/");
			const listid = path[2];
			const characterid = path[3];
			const list = this.$accessor.collection.lists.filter((list) => list.id === listid);
			if (list.length === 0) {
				this.$router.push(this.$accessor.navigationPaths.collection);
			}
			this.$accessor.setList(list[0]);
			const character = this.$accessor.list.characters.filter((character) => character.id === characterid);
			if (character.length === 0) {
				this.$accessor.setCharacter(newCharacter());
			} else {
				this.$accessor.setCharacter(character[0]);
			}
		}

		async quickImage(event: MouseEvent) {
			if (event.ctrlKey) {
				this.quickImages = !this.quickImages;
				return;
			}
			if (this.quickImages) {
				this.$accessor.addCharacterImage({ src: await navigator.clipboard.readText() });
			}
		}

		backToCharacterList() {
			this.$accessor.resetCharacter();
			this.$router.push(this.$accessor.navigationPaths.list);
		}
	}
</script>
