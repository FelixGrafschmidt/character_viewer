<template>
	<div class="flex flex-col items-center w-1/2 justify-between h-[80vh]">
		<div class="h-[75%] min-h-[75%] justify-center flex cursor-pointer">
			<figure @click="openImage(image)" class="flex flex-col justify-center">
				<img :alt="character.name" :src="image.src || ''" @load="markValid(image)" class="rounded max-h-full m-auto" />
			</figure>
		</div>
		<div class="flex relative h-[15%]">
			<button
				v-show="thumbsScrolling"
				@mouseenter="scrollThumbsLeft = true"
				@mouseleave="scrollThumbsLeft = false"
				class="focus:outline-none absolute left-[-2.5rem] top-[5%] bg-teal-600 px-2 rounded-full fas fa-angle-left h-full"
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
					scrollbar-thin scrollbar-thumb-rounded scrollbar-track-rounded scrollbar-track-gray-300 scrollbar-thumb-gray-500
					dark:scrollbar-track-gray-800 dark:scrollbar-thumb-gray-500
					max-w-[30vw]
				"
			>
				<figure
					v-for="(img, i) in character.images"
					:key="i"
					:class="{
						'border-red-500 border-4': !img.valid,
					}"
					@click="image = img"
					class="cursor-pointer max-h-full min-w-[4rem] max-w-[4rem]"
				>
					<img
						:class="{
							'border-teal-300 border-4': img.main,
							'border-green-700 border-4': img === image && img.valid,
						}"
						:src="img.src"
						:alt="i"
						@load="markValid(img)"
						@error="markInvalid(img)"
						class="rounded overflow-hidden max-h-[6rem] mx-auto"
					/>
				</figure>
			</div>
			<button
				v-show="thumbsScrolling"
				@mouseenter="scrollThumbsRight = true"
				@mouseleave="scrollThumbsRight = false"
				class="focus:outline-none absolute right-[-2.5rem] top-[5%] h-full bg-teal-600 rounded-full px-2 fas fa-angle-right"
			></button>
		</div>
		<div class="flex gap-4 items-center justify-self-end h-[5%]">
			<MoeTooltip :text="$t('image.make_main')" position="top">
				<MoeButtonLight @click.native="designateMainImage" icon="fas fa-star" />
			</MoeTooltip>
			<MoeTooltip :text="$t('image.remove')" position="top">
				<MoeButtonLight
					@click.native="deleteImage"
					class="dark:!bg-red-600 !bg-red-400 dark-hover:!bg-red-700 hover:!bg-red-500 !text-color-unset"
					icon="fas fa-trash"
				/>
			</MoeTooltip>
			<MoeTooltip :text="$t('image.add')" position="top">
				<MoeButtonLight @click.stop.native="addNewImage" icon="fas fa-plus" />
			</MoeTooltip>
			<MoeTooltip :text="$t('image.add_multi')" position="top">
				<MoeButtonLight @click.stop.native="addImageMulti" icon="fab fa-buffer" />
			</MoeTooltip>
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

		addImageMulti() {
			this.$vxm.main.setModal(Modal.IMAGEMULTI);
		}

		designateMainImage() {
			const index = this.character.images.indexOf(this.image);
			this.$vxm.main.characterStore.designateMainImage(index);
		}

		markInvalid(image: CharacterImage) {
			image.valid = false;
		}

		markValid(image: CharacterImage) {
			image.valid = true;
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
