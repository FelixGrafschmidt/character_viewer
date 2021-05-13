<template>
	<div class="flex flex-col gap-3 max-h-[75vh]">
		<div class="grid grid-cols-2 gap-4">
			<div class="col-span-1 flex flex-col m-auto h-[71vh] items-center w-full">
				<img class="max-h-[70vh] rounded" :src="image.src" />
			</div>
			<div
				class="
					flex flex-wrap
					gap-2
					h-[71vh]
					overflow-y-scroll
					scrollbar scrollbar-thin scrollbar-track-gray-300 scrollbar-thumb-gray-400
					dark:scrollbar-track-gray-500 dark:scrollbar-thumb-gray-700
				"
			>
				<div
					v-for="(img, i) in character.images"
					:key="i"
					class="w-1/5 flex items-center cursor-pointer max-h-44"
					:class="{
						'border-red-500 border-4': !img.valid,
					}"
					@click="image = img"
				>
					<img
						:src="img.src"
						alt=""
						class=""
						:class="{
							'border-blue-500 border-4': img.main,
							'border-green-500 border-4': img === image && img.valid,
						}"
						@error="designateImageAsInvalid(img)"
					/>
				</div>
			</div>
		</div>
		<div class="grid grid-cols-4 gap-8 mx-20">
			<MoeButton
				class-names="p-1 rounded-md text-sm font-medium focus:outline-none "
				color="dark:bg-gray-600 bg-gray-400"
				text="Back to Character"
				@click.native="backToCharacter"
			/>
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
				text="Add new Image"
				@click.native="addNewImage"
			/>
		</div>
	</div>
</template>

<script lang="ts">
	// Vue basics
	import { Component, Vue, Watch } from "nuxt-property-decorator";
	import { Modal } from "~/models/enums/Modal";
	import { CharacterImage } from "~/models/interfaces/Character";

	@Component({
		name: "character-images",
		middleware: "routeguard",
	})
	export default class CharacterImages extends Vue {
		image: CharacterImage = { src: "", main: false, valid: true };

		get character() {
			return this.$accessor.character;
		}

		mounted() {
			this.image = this.getMainImage();
			if (!this.image) {
				this.$accessor.setModal(Modal.NEWIMAGE);
			}
		}

		getMainImage() {
			return (
				this.character.images.filter((image) => {
					return image.main;
				})[0] || ""
			);
		}

		addNewImage() {
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

		backToCharacter() {
			this.$router.push("/character-edit");
		}

		@Watch("character.images.length", { deep: true })
		onLengthChanged(_val: Number, _oldVal: Number) {
			if (!this.image) {
				this.image = this.getMainImage();
			}
		}
	}
</script>
