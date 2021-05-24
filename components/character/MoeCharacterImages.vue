<template>
	<div class="flex flex-col items-center w-1/2 justify-between h-[80vh]">
		<div class="h-[75%] min-h-[75%] justify-center flex cursor-pointer">
			<figure @click="openImage(image)">
				<img class="rounded max-h-full m-auto" :alt="character.name" :src="image.src || ''" />
			</figure>
		</div>
		<div class="flex relative h-[15%]">
			<button
				v-show="thumbsScrolling"
				class="focus:outline-none absolute left-[-2.5rem] top-[5%] bg-teal-600 px-2 rounded-full fas fa-angle-left h-full"
				@mouseenter="scrollThumbsLeft = true"
				@mouseleave="scrollThumbsLeft = false"
			></button>
			<div
				ref="thumbs"
				class="
					max-h-[6rem]
					min-h-[6rem]
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
						class="rounded overflow-hidden max-h-[6rem] mx-auto"
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
		<div class="flex gap-8 items-center justify-self-end h-[5%]">
			<MoeButton
				class-names="p-1 rounded-md text-sm font-medium focus:outline-none "
				color="dark:bg-gray-600 bg-gray-400"
				:text="$t('image.make_main')"
				@click.native="designateMainImage"
			/>
			<MoeButton
				class-names="p-1 rounded-md text-sm font-medium focus:outline-none "
				color="dark:bg-gray-600 bg-gray-400"
				:text="$t('image.remove')"
				@click.native="deleteImage"
			/>
			<MoeButton
				class-names="p-1 rounded-md text-sm font-medium focus:outline-none "
				color="dark:bg-gray-600 bg-gray-400"
				:text="$t('image.add')"
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
			return this.$vxm.main.characterStore.character;
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
			this.$vxm.main.setModal(Modal.NEWIMAGE);
			this.image = this.getMainImage();
		}

		designateMainImage() {
			const index = this.character.images.indexOf(this.image);
			this.$vxm.main.characterStore.designateMainImage(index);
		}

		designateImageAsInvalid(image: CharacterImage) {
			this.$vxm.main.characterStore.designateImageAsInvalid(image);
		}

		deleteImage() {
			const index = this.character.images.indexOf(this.image);
			this.$vxm.main.characterStore.removeCharacterImage(index);
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
			this.$vxm.main.characterStore.setActiveImage(image);
			this.$vxm.main.setModal(Modal.FULLSCREENIMG);
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
