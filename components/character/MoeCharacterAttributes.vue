<template>
	<form class="h-1/5 w-1/2 flex flex-col" @submit.prevent="isNewCharacter() ? saveNewCharacter() : saveChanges()">
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
			<MoeButton
				class="py-2 w-48"
				class-names="rounded-md text-sm font-medium focus:outline-none"
				color="dark:bg-gray-600 bg-gray-400"
				:text="copyText"
				@click.native.prevent="copyCharacter"
			/>
			<MoeButton
				class="py-2 w-48"
				class-names="rounded-md text-sm font-medium focus:outline-none"
				color="dark:bg-gray-600 bg-gray-400"
				text="Export Character"
				@click.native.prevent="exportCharacter"
			/>
		</div>
	</form>
</template>

<script lang="ts">
	import { Component, Vue } from "nuxt-property-decorator";
	import { saveAs } from "file-saver";
	import { Modal } from "~/models/enums/Modal";

	@Component({
		components: {},
		name: "MoeCharacterAttributes",
	})
	export default class MoeCharacterAttributes extends Vue {
		copyText = "Copy Character";
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
			this.backToCharacterList();
		}

		saveChanges() {
			this.backToCharacterList();
		}

		discardCharacter() {
			this.$accessor.resetCharacter();
			this.backToCharacterList();
		}

		deleteCharacter() {
			window.document.body.style.overflow = "hidden";
			this.$accessor.setModal(Modal.DELETECHARACTER);
		}

		changeName(event: InputEvent) {
			const name = (event.target as HTMLInputElement).value;
			this.$accessor.changeCharacterName(name);
		}

		changeOrigin(event: InputEvent) {
			const origin = (event.target as HTMLInputElement).value;
			this.$accessor.changeCharacterOrigin(origin);
		}

		copyCharacter() {
			this.copyText = "Copied!";
			window.setTimeout(() => {
				this.copyText = "Copy Character";
			}, 1000 * 2);
			navigator.clipboard.writeText(JSON.stringify(this.character));
		}

		exportCharacter() {
			saveAs(new File([JSON.stringify(this.character)], this.character.name + ".json"));
		}

		backToCharacterList() {
			this.$accessor.resetCharacter();
			this.$router.push(this.$accessor.navigationPaths.list);
		}
	}
</script>
