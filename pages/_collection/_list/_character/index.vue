<template>
	<div class="flex relative gap-4 mt-4" @click="quickImage">
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
			return this.$vxm.main.listStore.list.characters;
		}

		mounted() {
			const url = new URL(window.location.href);
			const path = url.pathname.split("/");
			const listid = path[2];
			const characterid = path[3];
			const list = this.$vxm.main.collectionStore.collection.lists.filter((list) => list.id === listid);
			if (list.length === 0) {
				this.$router.push(this.$vxm.main.navigationPaths.collection);
			}
			this.$vxm.main.listStore.setList(list[0]);
			const character = this.$vxm.main.listStore.list.characters.filter((character) => character.id === characterid);
			if (character.length === 0) {
				this.$vxm.main.characterStore.setCharacter(newCharacter());
			} else {
				this.$vxm.main.characterStore.setCharacter(character[0]);
			}
		}

		async quickImage(event: MouseEvent) {
			if (event.ctrlKey) {
				this.quickImages = !this.quickImages;
				return;
			}
			if (this.quickImages) {
				this.$vxm.main.characterStore.addCharacterImage({ src: await navigator.clipboard.readText(), valid: true });
			}
		}

		backToCharacterList() {
			this.$vxm.main.characterStore.resetCharacter();
			this.$router.push(this.$vxm.main.navigationPaths.list);
		}
	}
</script>
