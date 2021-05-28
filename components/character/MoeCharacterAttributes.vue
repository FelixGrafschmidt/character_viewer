<template>
	<form @submit.prevent="isNewCharacter() ? saveNewCharacter() : saveChanges()" class="h-1/5 w-1/2 flex flex-col">
		<label>
			{{ $t("character.name") }}
			<input
				:value="character.name"
				@input="changeName"
				type="text"
				class="block rounded-lg border text-gray-900 bg-gray-300 focus:outline-none h-8 w-full mb-8"
			/>
		</label>
		<label>
			{{ $t("character.origin") }}
			<input
				:value="character.origin"
				@input="changeOrigin"
				type="text"
				class="block rounded-lg border text-gray-900 bg-gray-300 focus:outline-none h-8 w-full"
			/>
		</label>
		<div class="flex mt-8 justify-center gap-8">
			<div class="has-tooltip flex flex-col items-center">
				<MoeButtonLight
					icon="fas fa-save"
					class="py-2 w-24 dark:!bg-green-600 !bg-green-400 dark-hover:!bg-green-700 hover:!bg-green-500"
				/>
				<span class="tooltip bg-gray-700 dark:bg-gray-700 rounded mx-auto mt-10 p-1"> {{ $t("character.save") }} </span>
			</div>
			<div v-if="!isNewCharacter()" class="has-tooltip flex flex-col items-center">
				<MoeButtonLight
					@click.native.prevent="deleteCharacter"
					icon="fas fa-trash"
					class="py-2 w-24 dark:!bg-red-600 !bg-red-400 dark-hover:!bg-red-700 hover:!bg-red-500"
				/>
				<span class="tooltip bg-gray-700 dark:bg-gray-700 rounded mx-auto mt-10 p-1"> {{ $t("character.delete") }} </span>
			</div>
			<div v-else class="has-tooltip flex flex-col items-center">
				<MoeButtonLight
					@click.native.prevent="discardCharacter"
					icon="fas fa-trash"
					class="py-2 w-24 dark:!bg-red-600 !bg-red-400 dark-hover:!bg-red-700 hover:!bg-red-500"
				/>
				<span class="tooltip bg-gray-700 dark:bg-gray-700 rounded mx-auto mt-10 p-1"> {{ $t("character.discard") }} </span>
			</div>
			<div v-if="copied">
				<MoeButtonLight @click.native.prevent="copyCharacter" class="py-2 w-24">
					{{ $t("character.copied") }}
				</MoeButtonLight>
			</div>
			<div v-else class="has-tooltip flex flex-col items-center">
				<MoeButtonLight @click.native.prevent="copyCharacter" icon="fas fa-copy" class="py-2 w-24" />
				<span class="tooltip bg-gray-700 dark:bg-gray-700 rounded mx-auto mt-10 p-1">
					{{ $t("character.copy") }}
				</span>
			</div>
			<div class="has-tooltip flex flex-col items-center">
				<MoeButtonLight @click.native.prevent="exportCharacter" class="py-2 w-24" icon="fas fa-file-export" />
				<span class="tooltip bg-gray-700 dark:bg-gray-700 rounded mx-auto mt-10 p-1">
					{{ $t("character.export") }}
				</span>
			</div>
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
		copied = false;
		get character() {
			return this.$vxm.main.characterStore.character;
		}

		get characters() {
			return this.$vxm.main.listStore.list.characters;
		}

		isNewCharacter() {
			return !(this.characters.filter((character) => character.id === this.character.id).length > 0);
		}

		async saveNewCharacter() {
			this.$vxm.main.listStore.addCharacter({ character: this.character, index: -1 });
			await this.backToCharacterList();
		}

		async saveChanges() {
			await this.backToCharacterList();
		}

		async discardCharacter() {
			this.$vxm.main.characterStore.resetCharacter();
			await this.backToCharacterList();
		}

		deleteCharacter() {
			this.$vxm.main.setModal(Modal.DELETECHARACTER);
		}

		changeName(event: InputEvent) {
			const name = (event.target as HTMLInputElement).value;
			this.$vxm.main.characterStore.changeCharacterName(name);
		}

		changeOrigin(event: InputEvent) {
			const origin = (event.target as HTMLInputElement).value;
			this.$vxm.main.characterStore.changeCharacterOrigin(origin);
		}

		copyCharacter() {
			this.copied = true;
			window.setTimeout(() => {
				this.copied = false;
			}, 1000 * 2);
			navigator.clipboard.writeText(JSON.stringify(this.character));
		}

		exportCharacter() {
			saveAs(new File([JSON.stringify(this.character)], this.character.name + ".json"));
		}

		backToCharacterList() {
			this.$vxm.main.characterStore.resetCharacter();
			this.$router.push(this.$vxm.main.navigationPaths.list);
		}
	}
</script>
