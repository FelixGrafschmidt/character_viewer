<template>
	<div class="pb-4">
		<header class="sticky top-0 dark:bg-gray-900 bg-gray-100 pb-2">
			<div v-if="mode === 'character'" class="flex flex-col gap-4">
				<div class="m-auto">{{ character.name }}</div>
				<MoeButton
					text="Back"
					class="m-auto w-60 h-8"
					class-names="p-1 rounded-md text-sm font-medium focus:outline-none "
					color="dark:bg-gray-600 bg-gray-400"
					@click.native="mode = 'list'"
				/>
			</div>
			<div v-else-if="mode === 'list'" class="flex flex-col gap-4">
				<div class="m-auto">{{ list.name }}</div>
				<MoeButton
					text="Back"
					class="m-auto w-60 h-8"
					class-names="p-1 rounded-md text-sm font-medium focus:outline-none "
					color="dark:bg-gray-600 bg-gray-400"
					@click.native="mode = 'collection'"
				/>
			</div>
			<div v-else-if="collection.lists.length > 0" class="flex flex-col gap-4">
				<span class="m-auto">{{ collection.id }}</span>
			</div>
		</header>
		<section class="mt-2">
			<div v-if="mode === 'character'" class="flex flex-col gap-4">
				<img v-for="(image, i) in character.images" :key="i" :src="image.src" :alt="image.src" />
			</div>
			<div v-else-if="mode === 'list'" class="flex flex-col gap-4">
				<img
					v-for="character in list.characters"
					:key="character.id"
					:alt="character.name"
					:src="getMainImage(character).src"
					@click="selectCharacter(character)"
				/>
			</div>
			<div v-else class="flex flex-col gap-4">
				<div v-if="collection.lists.length === 0" class="m-auto flex flex-col items-center">
					<p>Empty collection. Load a different one?</p>
					<MoeButton
						text="Load Collection"
						class="w-60 h-8 mt-2"
						class-names="p-1 rounded-md text-sm font-medium focus:outline-none "
						color="dark:bg-gray-600 bg-gray-400"
						@click.native="openModal()"
					/>
				</div>
				<template v-else>
					<MoeButton
						v-for="list in collection.lists"
						:key="list.id"
						class="m-auto w-60 h-12"
						class-names="p-1 rounded-md text-sm font-medium focus:outline-none "
						color="dark:bg-gray-600 bg-gray-400"
						:text="list.name"
						@click.native="selectList(list)"
					/>
				</template>
			</div>
		</section>
	</div>
</template>

<script lang="ts">
	// Vue basics
	import { Component, Vue } from "nuxt-property-decorator";
	import { Modal } from "~/models/enums/Modal";
	import { Character } from "~/models/interfaces/Character";
	import { List } from "~/models/interfaces/List";

	@Component({
		name: "mobile",
		layout: "mobile",
	})
	export default class Mobile extends Vue {
		mode: string = "collection";

		get collection() {
			return this.$accessor.collection;
		}

		get list() {
			return this.$accessor.list;
		}

		get character() {
			return this.$accessor.character;
		}

		mounted() {
			if (this.$route.query.id) {
				window.localStorage.setItem("collectionId", this.$route.query.id.toString());
				this.$accessor.loadCollection();
			} else if (window.localStorage.getItem("collectionId")) {
				this.$accessor.loadCollection();
			} else {
				this.$accessor.setModal(Modal.LOADCOLLECTION);
			}
		}

		selectList(list: List) {
			this.$accessor.setList(list);
			this.changeMode("list");
		}

		selectCharacter(character: Character) {
			this.$accessor.setCharacter(character);
			this.changeMode("character");
		}

		changeMode(mode: string) {
			window.scroll(0, 0);
			this.mode = mode;
		}

		openModal() {
			this.$accessor.setModal(Modal.LOADCOLLECTION);
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
