<template>
	<div class="rounded">
		<div
			v-for="(character, index) in characters"
			:key="index"
			class="flex h-24 hover:bg-gray-400 dark-hover:bg-gray-700 items-center rounded cursor-pointer my-1"
			:class="{
				'bg-gray-300  dark:bg-gray-800': index % 2 === 0,
			}"
			@click="selectCharacter(character)"
		>
			<div class="w-2/5 text-center">{{ character.name }}</div>
			<form class="w-2/5 text-center relative">{{ character.origin }}</form>
			<form class="w-1/6 text-center relative">{{ character.images.length }}</form>
			<div class="w-1/6 text-center">
				<img class="max-h-24 max-w-24 rounded m-auto" :src="getMainImage(character).src" :alt="character.name" />
			</div>
		</div>
	</div>
</template>

<script lang="ts">
	import { Component, Vue } from "nuxt-property-decorator";
	import { Character } from "~/models/interfaces/Character";

	@Component({
		components: {},
		name: "MoeListCharacters",
	})
	export default class MoeListCharacters extends Vue {
		get characters() {
			return this.$vxm.main.listStore.list.characters;
		}

		selectCharacter(character: Character) {
			this.$vxm.main.characterStore.setCharacter(character);
			this.$router.push(this.$vxm.main.navigationPaths.character);
		}

		getMainImage(character: Character) {
			return (
				character.images.filter((image) => {
					return image.main;
				})[0] || ""
			);
		}
	}
</script>
