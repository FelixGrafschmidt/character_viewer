<template>
	<div class="rounded">
		<div
			v-for="(character, index) in characters"
			:ref="character.id"
			:key="index"
			:class="{
				'bg-gray-300  dark:bg-gray-800': index % 2 === 0,
			}"
			@click="selectCharacter(character)"
			class="flex h-24 hover:bg-gray-400 dark-hover:bg-gray-700 items-center rounded cursor-pointer my-1"
		>
			<div class="w-2/5 text-center">{{ character.name }}</div>
			<form class="w-2/5 text-center relative">{{ character.origin }}</form>
			<form class="w-1/6 text-center relative">{{ character.images.length }}</form>
			<div class="w-1/6 text-center">
				<img :src="getMainImage(character).src" :alt="character.name" class="max-h-24 max-w-24 rounded m-auto" />
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

		get scrollID() {
			return this.$vxm.main.scrollID;
		}

		mounted() {
			if (this.scrollID && this.$refs[this.scrollID]) {
				const element = this.$refs[this.scrollID] as Element[];
				element[0].scrollIntoView({ behavior: "auto", block: "start", inline: "start" });
			}
			this.$vxm.main.setScrollID("");
		}

		selectCharacter(character: Character) {
			this.$vxm.main.setScrollID(character.id);
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
