<template>
	<div class="flex flex-col items-center w-1/2 gap-2 justify-between">
		<figure class="h-[75%] min-h-[57vh] 2xl:min-h-[64vh] 2xl:h-[84%] justify-center flex cursor-pointer" @click="openImage(image)">
			<img class="rounded" :alt="character.name" :src="image.src || ''" />
		</figure>
		<div class="flex relative">
			<button
				v-show="thumbsScrolling"
				class="focus:outline-none absolute left-[-2.5rem] top-[5%] bg-teal-600 px-2 rounded-full fas fa-angle-left h-full"
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
				class="focus:outline-none absolute right-[-2.5rem] top-[5%] h-full bg-teal-600 rounded-full px-2 fas fa-angle-right"
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
</template>

<script lang="ts">
	import { Component, Vue, Watch } from "nuxt-property-decorator";
	import { Modal } from "~/models/enums/Modal";
	import { CharacterImage } from "~/models/interfaces/Character";

	@Component({
		components: {},
		name: "MoeCharacterImages",
	})
	export default class MoeCharacterImages extends Vue {
		scrollThumbsLeft = false;
		scrollThumbsRight = false;
		thumbsScrolling = false;
		image: CharacterImage = { src: "", main: false, valid: true };
		get character() {
			return this.$accessor.character;
		}

		mounted() {
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

		getMainImage() {
			return (
				this.character.images.filter((image) => {
					return image.main;
				})[0] || ""
			);
		}

		addNewImage() {
			window.document.body.style.overflow = "hidden";
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

		calculateThumbsScrolling() {
			const thumbs = this.$refs.thumbs as Element;
			let childrenWidth = 0;
			for (const child of Array.from(thumbs.children)) {
				childrenWidth += child.clientWidth;
			}
			this.thumbsScrolling = childrenWidth > thumbs.clientWidth;
		}

		openImage(image: CharacterImage) {
			window.scroll(0, 0);
			this.$accessor.setImage(image);
			window.document.body.style.overflow = "hidden";
			this.$accessor.setModal(Modal.FULLSCREENIMG);
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
