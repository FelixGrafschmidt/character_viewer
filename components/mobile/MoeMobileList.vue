<template>
	<div class="flex flex-col gap-4">
		<img
			v-for="character in list.characters"
			:key="character.id"
			:alt="character.name"
			:src="getMainImage(character).src"
			@click="selectCharacter(character)"
		/>
	</div>
</template>

<script lang="ts">
	import { Component, Vue } from "nuxt-property-decorator";
	import { Character } from "~/models/interfaces/Character";

	@Component({
		name: "MoeMobileList",
	})
	export default class MoeMobileList extends Vue {
		get list() {
			return this.$vxm.main.listStore.list;
		}

		getMainImage(character: Character) {
			return (
				character.images.filter((image) => {
					return image.main;
				})[0] || ""
			);
		}

		selectCharacter(character: Character) {
			this.$vxm.main.characterStore.setCharacter(character);
			this.changeMode("character");
		}

		changeMode(mode: string) {
			window.scroll(0, 0);
			this.$vxm.main.setMobileMode(mode);
		}
	}
</script>
