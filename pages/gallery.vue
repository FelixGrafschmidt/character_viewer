<template>
	<div
		class="
			flex
			h-full
			flex-wrap
			gap-2
			overflow-y-scroll
			scrollbar scrollbar-thin scrollbar-track-gray-300 scrollbar-thumb-gray-400
			dark:scrollbar-track-gray-500 dark:scrollbar-thumb-gray-700
			max-h-[80vh]
			relative
		"
	>
		<div v-if="mode === 'characters'" class="has-tooltip absolute top-0 left-0">
			<MoeButton
				icon-class-names="fas fa-arrow-left"
				class="py-1 px-4 rounded-br-sm has-tooltip"
				class-names="text-sm font-medium focus:outline-none"
				color="dark:bg-gray-600 bg-gray-400"
				@click.native="mode = 'list'"
			/>
			<span class="tooltip bg-gray-300 dark:bg-gray-500 p-2 ml-2 rounded">Show all Characters</span>
		</div>
		<template v-if="mode === 'list'">
			<figure v-for="(character, i) in list.characters" :key="i" class="w-[30%] cursor-pointer" @click="selectCharacter(character)">
				<img :src="getMainImage(character).src" :alt="i" class="" />
			</figure>
		</template>
		<template v-if="mode === 'characters'">
			<figure v-for="(image, i) in character.images" :key="i" class="w-[30%]">
				<img :src="image.src" :alt="i" class="" />
			</figure>
		</template>
	</div>
</template>

<script lang="ts">
	// Vue basics
	import { Component, Vue } from "nuxt-property-decorator";
	import { Character } from "~/models/interfaces/Character";
	@Component({
		components: {},
		name: "gallery",
		middleware: "routeguard",
	})
	export default class Gallery extends Vue {
		mode: string = "list";
		character!: Character;

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
			this.character = character;
		}
	}
</script>
