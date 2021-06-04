<template>
	<div @click.stop class="h-screen max-h-screen relative w-screen">
		<client-only>
			<vue-easy-lightbox
				:loop="true"
				:visible="true"
				:imgs="imagesRaw"
				:index="index"
				@hide="$vxm.main.deactivateModal()"
				class="max-h-screen !z-0"
			/>
		</client-only>
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
					@click="index = i"
					class="min-w-[4rem] max-w-[4rem] h-full cursor-pointer flex flex-col justify-center"
				>
					<img :src="image.src" :alt="i" class="object-contain max-h-[6rem]" />
				</figure>
			</div>
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
		index = 0;

		get src() {
			return this.$vxm.main.characterStore.activeImage.src;
		}

		get imagesRaw() {
			return this.$vxm.main.characterStore.character.images.map((img) => img.src);
		}

		get images() {
			return this.$vxm.main.characterStore.character.images;
		}

		selectImage(image: CharacterImage) {
			this.$vxm.main.characterStore.setActiveImage(image);
		}

		showImg(index: any) {
			this.index = index;
		}
	}
</script>

<style lang="postcss" scoped>
	::v-deep .vel-toolbar {
		position: absolute;
		top: 0;
		height: fit-content;
	}
</style>
