<template>
	<form @submit.prevent="isNewCharacter() ? saveNewCharacter() : saveChanges()" class="w-1/2 flex flex-col h-[80vh] justify-between">
		<div
			class="
				max-h-[85%]
				min-h-[85%]
				pr-8
				scrollbar-thin scrollbar-track-gray-300 scrollbar-thumb-gray-500
				dark:scrollbar-track-gray-700 dark:scrollbar-thumb-gray-500
				scrollbar-track-rounded scrollbar-thumb-rounded
				overflow-y-scroll
				pl-1
			"
		>
			<div class="py-2">
				<label>
					{{ $t("character.name") }}
					<input
						:value="character.name"
						@input="changeName"
						type="text"
						class="block rounded-lg border text-gray-900 bg-gray-300 focus:outline-none h-8 w-full"
				/></label>
			</div>
			<div class="py-2">
				<label>
					{{ $t("character.origin") }}
					<input
						:value="character.origin"
						@input="changeOrigin"
						type="text"
						class="block rounded-lg border text-gray-900 bg-gray-300 focus:outline-none h-8 w-full"
				/></label>
			</div>
			<div v-for="(attribute, i) in character.attributeArray" :key="i" class="py-2 relative">
				<MoeTooltip text="Remove Attribute" position="left" extra-classes="mt-16">
					<span
						@click="removeAttribute(attribute)"
						class="
							items-center
							justify-center
							top-5
							right-0
							flex
							dark:bg-red-600
							bg-red-400
							dark-hover:bg-red-700
							hover:bg-red-500
							dark:text-gray-900
							text-gray-100
							h-8
							w-8
							rounded-lg
							cursor-pointer
							absolute
							fas
							fa-times
						"
					></span
				></MoeTooltip>
				<label>
					<input
						v-model="attribute.name"
						v-autofocus
						type="text"
						class="h-4 block border-none rounded text-gray-100 dark:bg-gray-900 focus:outline-none w-32 mb-1 pl-0"
					/>
					<input
						v-model="attribute.value"
						type="text"
						class="block rounded-lg border text-gray-900 bg-gray-300 focus:outline-none h-8 w-full"
					/>
				</label>
			</div>
			<div class="flex justify-center mt-8">
				<MoeTooltip text="Add Attribute" class="mb-8" position="top">
					<MoeButtonLight @click.native.prevent="addAttribute" icon="fas fa-plus" class="py-2 w-48" />
				</MoeTooltip>
			</div>
		</div>
		<div class="flex justify-center gap-8 max-h-[10%] min-h-[10%]">
			<MoeTooltip :text="$t('character.save')" position="top">
				<MoeButtonLight
					icon="fas fa-save"
					class="py-2 w-24 dark:!bg-green-600 !bg-green-400 dark-hover:!bg-green-700 hover:!bg-green-500 !text-color-unset"
				/>
			</MoeTooltip>
			<MoeTooltip v-if="!isNewCharacter()" :text="$t('character.delete')" position="top">
				<MoeButtonLight
					@click.native.prevent="deleteCharacter"
					icon="fas fa-trash"
					class="py-2 w-24 dark:!bg-red-600 !bg-red-400 dark-hover:!bg-red-700 hover:!bg-red-500 !text-color-unset"
				/>
			</MoeTooltip>
			<MoeTooltip v-else :text="$t('character.discard')" position="top">
				<MoeButtonLight
					@click.native.prevent="discardCharacter"
					icon="fas fa-trash"
					class="py-2 w-24 dark:!bg-red-600 !bg-red-400 dark-hover:!bg-red-700 hover:!bg-red-500 !text-color-unset"
				/>
			</MoeTooltip>
			<div v-if="copied">
				<MoeButtonLight @click.native.prevent="copyCharacter" class="py-2 w-24">
					{{ $t("character.copied") }}
				</MoeButtonLight>
			</div>
			<MoeTooltip v-else :text="$t('character.copy')" position="top">
				<MoeButtonLight @click.native.prevent="copyCharacter" icon="fas fa-copy" class="py-2 w-24" />
			</MoeTooltip>
			<MoeTooltip :text="$t('character.export')" position="top">
				<MoeButtonLight @click.native.prevent="exportCharacter" class="py-2 w-24" icon="fas fa-file-export" />
			</MoeTooltip>
		</div>
	</form>
</template>

<script lang="ts">
	import { Component, Vue } from "nuxt-property-decorator";
	import { saveAs } from "file-saver";
	import { Modal } from "~/models/enums/Modal";
	import { CharacterAttribute } from "~/models/interfaces/Character";

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
			this.$vxm.main.toList(this.$router);
		}

		addAttribute() {
			this.$vxm.main.characterStore.addAttribute();
			this.$forceUpdate();
		}

		removeAttribute(attribute: CharacterAttribute) {
			this.$vxm.main.characterStore.removeAttribute(attribute);
		}

		beforeDestroy() {
			this.$vxm.main.listStore.updateCharacter(this.character);
		}
	}
</script>
