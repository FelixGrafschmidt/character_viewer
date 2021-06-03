<template>
	<div class="flex items-center justify-between w-full">
		<MoeButtonLight
			:class="{
				visible: $vxm.main.characterStore.character.images.length > 1,
				invisible: $vxm.main.characterStore.character.images.length <= 1,
			}"
			@click.native.stop="$vxm.main.characterStore.previousImage"
			class="h-20 w-20 !rounded-full text-5xl ml-2"
			icon="fas fa-angle-left"
		/>
		<figure>
			<img :src="src" class="max-h-screen max-w-[80vw]" />
		</figure>

		<MoeButtonLight
			@click.native.stop="$vxm.main.characterStore.nextImage"
			:class="{
				visible: $vxm.main.characterStore.character.images.length > 1,
				invisible: $vxm.main.characterStore.character.images.length <= 1,
			}"
			class="h-20 w-20 !rounded-full text-5xl mr-2"
			icon="fas fa-angle-right"
		/>
	</div>
</template>

<script lang="ts">
	import { Component, Vue } from "nuxt-property-decorator";

	@Component({
		components: {},
		name: "MoeFullscreenImg",
	})
	export default class MoeFullscreenImg extends Vue {
		get src() {
			return this.$vxm.main.characterStore.activeImage.src;
		}
	}
</script>
