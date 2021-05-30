<template>
	<nav class="dark:bg-gray-800 bg-gray-500 pl-2 min-w-full flex items-center h-16 gap-3" role="navigation" aria-label="main navigation">
		<MoeButtonDark
			:icon="{
				'fas fa-moon': $colorMode.preference === 'light',
				'fas fa-sun': !$colorMode.preference || $colorMode.preference === 'dark',
			}"
			@click.native="changeMode"
			class="max-w-[5%]"
		/>
		<div class="w-[50%] gap-3 flex items-center justify-start">
			<nuxt-link v-slot="{ navigate }" tag="h2" custom to="/">
				<h2 @click="navigate" @keypress.enter="navigate" class="text-xl cursor-pointer title caps-small" role="link">
					{{ $t("header.title") }}
				</h2>
			</nuxt-link>
			<MoeSaveArea />
		</div>
		<MoeCollectionArea />
	</nav>
</template>

<script lang="ts">
	import { Component, Vue } from "nuxt-property-decorator";

	@Component({
		components: {},
		name: "MoeHeader",
	})
	export default class MoeHeader extends Vue {
		// Methods
		changeMode() {
			this.$colorMode.preference = this.$colorMode.preference === "light" ? "dark" : "light";
		}

		mounted() {
			if (localStorage.getItem("collection")) {
				this.$vxm.main.collectionStore.setCollectionNoHash(JSON.parse(localStorage.getItem("collection")!));
				localStorage.removeItem("collection");
			}
			if (localStorage.getItem("hash")) {
				this.$vxm.main.collectionStore.setHash(localStorage.getItem("hash")!);
				localStorage.removeItem("hash");
			}
		}
	}
</script>

<style lang="postcss" scoped>
	.title {
		font-family: "Alfa Slab One", cursive;
		letter-spacing: 1px;
	}
</style>
