<template>
	<div class="flex relative gap-4 max-h-[75vh] my-20" @click="quickImages ? addImageQuick($event) : undefined">
		<div class="has-tooltip absolute top-[-1.5rem] left-[-1.5rem]">
			<MoeButton
				icon-class-names="fas fa-arrow-left"
				class="py-1 px-4 rounded-br-sm has-tooltip"
				class-names="text-sm font-medium focus:outline-none"
				color="dark:bg-gray-600 bg-gray-300"
				@click.native="backToCharacterList"
			/>
			<span class="tooltip bg-gray-300 dark:bg-gray-600 px-2 ml-2 my-0 rounded w-44">Back to Character List</span>
		</div>

		<div class="flex flex-col items-center w-1/2 gap-2 justify-between">
			<figure class="h-[70%] min-h-[53vh] 2xl:min-h-[60vh] 2xl:h-[80%] justify-center flex">
				<img class="rounded" :alt="character.name" :src="image.src || ''" />
			</figure>
			<div class="flex relative">
				<button
					v-show="thumbsScrolling"
					class="focus:outline-none absolute left-[-2.5rem] top-[5%] bg-teal-600 px-2 rounded-full fas fa-arrow-left h-full"
					@mouseenter="scrollThumbsLeft = true"
					@mouseleave="scrollThumbsLeft = false"
				></button>
				<div
					ref="thumbs"
					class="
						max-h-[7rem]
						min-h-[7rem]
						w-full
						flex
						gap-1
						items-center
						overflow-x-scroll
						scrollbar scrollbar-thin scrollbar-track-gray-300 scrollbar-thumb-gray-500
						dark:scrollbar-track-gray-800 dark:scrollbar-thumb-gray-500
						max-w-[30vw]
					"
				>
					<figure
						v-for="(img, i) in character.images"
						:key="i"
						class="cursor-pointer max-h-full min-w-[4rem] max-w-[4rem]"
						:class="{
							'border-red-500 border-4': !img.valid,
						}"
						@click="image = img"
					>
						<img
							class="rounded overflow-hidden max-h-[7rem] mx-auto"
							:class="{
								'border-teal-300 border-4': img.main,
								'border-green-700 border-4': img === image && img.valid,
							}"
							:src="img.src"
							:alt="i"
							@error="designateImageAsInvalid(img)"
						/>
					</figure>
				</div>
				<button
					v-show="thumbsScrolling"
					class="focus:outline-none absolute right-[-2.5rem] top-[5%] h-full bg-teal-600 rounded-full px-2 fas fa-arrow-right"
					@mouseenter="scrollThumbsRight = true"
					@mouseleave="scrollThumbsRight = false"
				></button>
			</div>
			<div class="flex gap-8 pt-4 items-center justify-self-end">
				<MoeButton
					class-names="p-1 rounded-md text-sm font-medium focus:outline-none "
					color="dark:bg-gray-600 bg-gray-400"
					text="Designate as Main Image"
					@click.native="designateMainImage"
				/>
				<MoeButton
					class-names="p-1 rounded-md text-sm font-medium focus:outline-none "
					color="dark:bg-gray-600 bg-gray-400"
					text="Remove this Image"
					@click.native="deleteImage"
				/>
				<MoeButton
					class-names="p-1 rounded-md text-sm font-medium focus:outline-none "
					color="dark:bg-gray-600 bg-gray-400"
					text="Add Image"
					@click.stop.native="addNewImage"
				/>
			</div>
		</div>
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
	</div>
</template>

<script lang="ts">
	// Vue basics
	import { Component, Vue, Watch } from "nuxt-property-decorator";
	import { saveAs } from "file-saver";
	import { Modal } from "~/models/enums/Modal";
	import { CharacterImage, newCharacter } from "~/models/interfaces/Character";
	@Component({
		name: "character",
	})
	export default class Character extends Vue {
		copyText = "Copy Character";
		quickImages = false;
		scrollThumbsLeft = false;
		scrollThumbsRight = false;
		thumbsScrolling = false;

		image: CharacterImage = { src: "", main: false, valid: true };

		get character() {
			return this.$accessor.character;
		}

		get characters() {
			return this.$accessor.list.characters;
		}

		mounted() {
			const url = new URL(window.location.href);
			const path = url.pathname.split("/");
			const listid = path[2];
			const characterid = path[3];
			const list = this.$accessor.collection.lists.filter((list) => list.id === listid);
			if (list.length === 0) {
				this.$router.push(this.$accessor.navigationPaths.collection);
			}
			this.$accessor.setList(list[0]);
			const character = this.$accessor.list.characters.filter((character) => character.id === characterid);
			if (character.length === 0) {
				this.$accessor.setCharacter(newCharacter());
			} else {
				this.$accessor.setCharacter(character[0]);
			}
			this.image = this.getMainImage();

			window.setInterval(() => {
				const thumbs = this.$refs.thumbs as Element;
				if (this.scrollThumbsLeft) {
					thumbs.scrollLeft -= 10;
				}
				if (this.scrollThumbsRight) {
					thumbs.scrollLeft += 10;
				}
			}, 10);
			this.calculateThumbsScrolling();
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

		getMainImage() {
			return (
				this.character.images.filter((image) => {
					return image.main;
				})[0] || ""
			);
		}

		backToCharacterList() {
			this.$accessor.resetCharacter();
			this.$router.push(this.$accessor.navigationPaths.list);
		}

		addNewImage(event: MouseEvent) {
			if (event.ctrlKey) {
				this.quickImages = true;
				return;
			}
			this.$accessor.setModal(Modal.NEWIMAGE);
			this.image = this.getMainImage();
		}

		designateMainImage() {
			const index = this.character.images.indexOf(this.image);
			this.$accessor.designateMainImage(index);
		}

		designateImageAsInvalid(image: CharacterImage) {
			this.$accessor.designateImageAsInvalid(image);
		}

		deleteImage() {
			const index = this.character.images.indexOf(this.image);
			this.$accessor.removeCharacterImage(index);
			this.image = this.getMainImage();
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

		async addImageQuick(event: MouseEvent) {
			if (event.ctrlKey) {
				this.quickImages = false;
				return;
			}
			this.$accessor.addCharacterImage({ src: await navigator.clipboard.readText() });
		}

		calculateThumbsScrolling() {
			const thumbs = this.$refs.thumbs as Element;
			let childrenWidth = 0;
			for (const child of Array.from(thumbs.children)) {
				childrenWidth += child.clientWidth;
			}
			this.thumbsScrolling = childrenWidth > thumbs.clientWidth;
		}

		@Watch("character.images.length", { deep: true })
		onLengthChanged(_val: Number, _oldVal: Number) {
			if (!this.image) {
				this.image = this.getMainImage();
			}
			this.calculateThumbsScrolling();
		}
	}
</script>
