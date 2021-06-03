<template>
	<div @click.stop class="h-screen max-h-screen relative w-screen">
		<div class="flex items-center justify-between w-full h-screen max-h-screen">
			<MoeButtonLight
				:class="{
					visible: $vxm.main.characterStore.character.images.length > 1,
					invisible: $vxm.main.characterStore.character.images.length <= 1,
				}"
				@click.native.stop="$vxm.main.characterStore.previousImage"
				class="h-20 !rounded-full text-5xl ml-2 w-20 max-w-[7%]"
				icon="fas fa-angle-left"
			/>
			<div class="max-w-[86%]">
				<figure class="justify-center flex">
					<img :src="src" :alt="index" class="max-h-screen max-w-[80vw] h-full w-screen object-contain" />
				</figure>
			</div>
			<MoeButtonLight
				@click.native.stop="$vxm.main.characterStore.nextImage"
				:class="{
					visible: $vxm.main.characterStore.character.images.length > 1,
					invisible: $vxm.main.characterStore.character.images.length <= 1,
				}"
				class="h-20 w-20 !rounded-full text-5xl mr-2 max-w-[7%]"
				icon="fas fa-angle-right"
			/>
		</div>
		<div
			@mouseenter="showThumbs = true"
			@mouseleave="showThumbs = false"
			class="w-screen absolute bottom-0 h-1/3 flex flex-col-reverse"
		>
			<div
				v-show="showThumbs"
				class="
					flex
					overflow-x-scroll
					mx-8
					gap-1
					h-1/2
					max-h-[6rem]
					min-h-[6rem]
					scrollbar-thin scrollbar-thumb-rounded scrollbar-track-rounded scrollbar-track-gray-300 scrollbar-thumb-gray-500
					dark:scrollbar-track-gray-800 dark:scrollbar-thumb-gray-500
					bg-gray-700 bg-opacity-50
				"
			>
				<figure
					v-for="(image, i) in images"
					:key="image.src"
					@click="selectImage(image)"
					class="min-w-[4rem] max-w-[4rem] h-full cursor-pointer flex flex-col justify-center"
				>
					<img :src="image.src" :alt="i" class="object-contain max-h-[6rem]" />
				</figure>
			</div>
		</div>
		<div
			@click="$vxm.main.deactivateModal()"
			class="
				items-center
				justify-center
				top-1
				right-1
				flex
				dark:bg-red-600
				bg-red-400
				dark-hover:bg-red-700
				hover:bg-red-500
				dark:text-gray-900
				text-gray-100
				h-6
				w-6
				rounded-2xl
				cursor-pointer
				absolute
			"
		>
			<div class="fas fa-times"></div>
		</div>
	</div>
</template>

<script lang="ts">
	import { Component, Vue } from "nuxt-property-decorator";
	import { CharacterImage } from "~/models/interfaces/Character";

	@Component({
		components: {},
		name: "MoeFullscreenImg",
	})
	export default class MoeFullscreenImg extends Vue {
		showThumbs = false;

		get src() {
			return this.$vxm.main.characterStore.activeImage.src;
		}

		get index() {
			return this.$vxm.main.characterStore.character.images.indexOf(this.$vxm.main.characterStore.activeImage);
		}

		get images() {
			return this.$vxm.main.characterStore.character.images;
		}

		selectImage(image: CharacterImage) {
			this.$vxm.main.characterStore.setActiveImage(image);
		}
	}
</script>
