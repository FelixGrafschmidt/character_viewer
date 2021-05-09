<template>
	<div class="grid grid-cols-2">
		<div class="col-span-1 flex flex-col m-auto max-h-[71vh] items-center w-full">
			<img class="max-h-[70vh] rounded" :src="getMainImage().src || ''" />
			<MoeButton
				text="Edit Images"
				class="mt-2 mb-2 py-2"
				class-names="px-1 rounded-md text-sm font-medium focus:outline-none w-1/2"
				color="dark:bg-gray-600 bg-gray-400"
				@click.native="openImages"
			/>
		</div>
		<form class="col-span-1 flex flex-col" @submit.prevent="isNewCharacter() ? saveNewCharacter() : saveChanges()">
			<label>
				Name
				<input
					:value="character.name"
					type="text"
					class="block rounded-lg border text-gray-900 bg-gray-300 focus:outline-none h-8 w-full mb-8"
					@input="changeName"
				/>
			</label>
			<label>
				Origin
				<input
					:value="character.origin"
					type="text"
					class="block rounded-lg border text-gray-900 bg-gray-300 focus:outline-none h-8 w-full"
					@input="changeOrigin"
				/>
			</label>
			<div class="flex mt-8 justify-center gap-8">
				<MoeButton
					class="py-2 w-48"
					class-names="rounded-md text-sm font-medium focus:outline-none"
					color="dark:bg-green-600 bg-green-400"
					text="Save Character"
				/>
				<MoeButton
					v-if="!isNewCharacter()"
					class="w-48"
					class-names="rounded-md text-sm font-medium focus:outline-none"
					color="dark:bg-red-600 bg-red-400"
					text="Delete Character"
					@click.native.prevent="deleteCharacter"
				/>
				<MoeButton
					v-else
					class="w-48"
					class-names="rounded-md text-sm font-medium focus:outline-none"
					color="dark:bg-red-600 bg-red-400"
					text="Discard Character"
					@click.native.prevent="discardCharacter"
				/>
			</div>
		</form>
	</div>
</template>

<script lang="ts">
	// Vue basics
	import { Component, Vue } from "nuxt-property-decorator";
	import { Modal } from "~/models/enums/Modal";
	import { newCharacter } from "~/models/interfaces/Character";
	@Component({
		name: "character-edit",
		middleware: "routeguard",
	})
	export default class CharacterEdit extends Vue {
		get character() {
			return this.$accessor.character;
		}

		get characters() {
			return this.$accessor.list.characters;
		}

		isNewCharacter() {
			return !(this.characters.filter((character) => character.id === this.character.id).length > 0);
		}

		saveNewCharacter() {
			this.$accessor.addCharacter({ newCharacter: this.character });
			this.$router.push("/characters");
		}

		saveChanges() {
			this.$router.push("/characters");
		}

		discardCharacter() {
			this.$router.push("/characters");
			this.$accessor.setCharacter(newCharacter());
		}

		deleteCharacter() {
			this.$accessor.setModal(Modal.DELETECHARACTER);
			this.$router.push("/characters");
		}

		changeName(event: InputEvent) {
			const name = (event.target as HTMLInputElement).value;
			this.$accessor.changeCharacterName(name);
		}

		changeOrigin(event: InputEvent) {
			const origin = (event.target as HTMLInputElement).value;
			this.$accessor.changeCharacterOrigin(origin);
		}

		getMainImage() {
			return (
				this.character.images.filter((image) => {
					return image.main;
				})[0] || ""
			);
		}

		openImages() {
			this.$router.push("/character-images");
		}
	}
</script>
