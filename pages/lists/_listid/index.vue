<template>
	<div class="grid">
		<div v-if="characters.length > 0" class="grid">
			<div class="flex mb-2">
				<div class="w-2/5 text-center">Name</div>
				<div class="w-2/5 text-center">Origin</div>
				<div class="w-1/6 text-center">Main Image</div>
			</div>
			<div
				class="
					scrollbar scrollbar-thin scrollbar-track-gray-300 scrollbar-thumb-gray-400
					dark:scrollbar-track-gray-500 dark:scrollbar-thumb-gray-700
					overflow-y-scroll
					rounded
				"
			>
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
					<div class="w-1/6 text-center">
						<img class="max-h-24 max-w-24 rounded m-auto" :src="getMainImage(character).src" :alt="character.name" />
					</div>
				</div>
			</div>
		</div>
		<div class="flex mt-7 justify-center">
			<MoeButton :text="'Add New Character'" class="w-64 mr-2" color="dark:bg-gray-600 bg-gray-400" @click.native="addNewCharacter" />
		</div>
	</div>
</template>

<script lang="ts">
	// Vue basics
	import { Component, Vue } from "nuxt-property-decorator";
	import { Character, newCharacter } from "~/models/interfaces/Character";
	@Component({
		name: "characters",
		middleware: "routeguard",
	})
	export default class Characters extends Vue {
		get character() {
			return this.$accessor.character;
		}

		get characters() {
			return this.$accessor.list.characters;
		}

		addNewCharacter() {
			this.$accessor.setCharacter(newCharacter());
			this.$router.push(this.$accessor.navigationPaths.character);
		}

		selectCharacter(character: Character) {
			this.$accessor.setCharacter(character);
			this.$router.push(this.$accessor.navigationPaths.character);
		}

		getMainImage(character: Character) {
			return (
				character.images.filter((image) => {
					return image.main;
				})[0] || ""
			);
		}

		// mounted() {
		// 	if (this.characters.length === 0) {
		// 		this.$router.push("/character-edit");
		// 	}
		// }
	}
</script>
