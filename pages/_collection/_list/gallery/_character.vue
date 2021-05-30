<template>
	<div class="relative my-4">
		<MoeBackButton :tooltip-text="'Back to Gallery'" @back="toGallery" />
		<div class="flex flex-wrap gap-2 pt-2">
			<figure v-for="(image, i) in character.images" :key="i" @click="openImage(image)" class="w-[24%] cursor-pointer">
				<img :src="image.src" :alt="image.src" class="overflow-hidden" />
			</figure>
		</div>
	</div>
</template>

<script lang="ts">
	// Vue basics
	import { Component, Vue } from "nuxt-property-decorator";
	import { Modal } from "~/models/enums/Modal";
	import { CharacterImage } from "~/models/interfaces/Character";
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
			const list = this.$vxm.main.collectionStore.collection.lists.filter((list) => list.id === listid);
			if (list.length === 0) {
				this.$vxm.main.toCollection({ router: this.$router, keepCollection: false });
			}
			this.$vxm.main.listStore.setList(list[0]);
			const character = this.$vxm.main.listStore.list.characters.filter((character) => character.id === characterid);
			if (character.length === 0) {
				this.$router.push("/lists/" + listid + "/new");
			} else {
				this.$vxm.main.characterStore.setCharacter(character[0]);
			}
		}

		get character() {
			return this.$vxm.main.characterStore.character;
		}

		openImage(image: CharacterImage) {
			window.scroll(0, 0);
			this.$vxm.main.characterStore.setActiveImage(image);
			this.$vxm.main.setModal(Modal.FULLSCREENIMG);
		}

		toGallery() {
			this.$vxm.main.toGallery(this.$router);
		}
	}
</script>
