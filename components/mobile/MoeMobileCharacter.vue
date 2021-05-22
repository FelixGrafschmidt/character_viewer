<template>
	<div class="flex flex-col gap-4">
		<img v-for="(image, i) in character.images" :key="i" :src="image.src" :alt="image.src" />
	</div>
</template>

<script lang="ts">
	import { Component, Vue } from "nuxt-property-decorator";

	@Component({
		name: "MoeMobileCharacter",
	})
	export default class MoeMobileCharacter extends Vue {
		get character() {
			return this.$vxm.main.characterStore.character;
		}
	}
</script>
