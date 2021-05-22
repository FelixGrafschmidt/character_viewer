<template>
	<figure>
		<img :src="src" class="max-h-screen max-w-[100vw]" />
	</figure>
</template>

<script lang="ts">
	import { Component, Vue } from "nuxt-property-decorator";

	@Component({
		components: {},
		name: "MoeFullscreenImg",
	})
	export default class MoeFullscreenImg extends Vue {
		get src() {
			return this.$vxm.main.imageStore.image.src;
		}
	}
</script>
