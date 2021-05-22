<template>
	<section class="mt-2">
		<MoeMobileCharacter v-if="mobileMode === 'character'" />
		<MoeMobileList v-else-if="mobileMode === 'list'" />
		<MoeMobileCollection v-else />
	</section>
</template>

<script lang="ts">
	import { Component, Vue } from "nuxt-property-decorator";
	import { Modal } from "~/models/enums/Modal";

	@Component({
		name: "MoeMobileContent",
	})
	export default class MoeMobileContent extends Vue {
		get mobileMode() {
			return this.$accessor.mobileMode;
		}

		mounted() {
			if (this.$route.query.id) {
				window.localStorage.setItem("collectionId", this.$route.query.id.toString());
				this.$accessor.loadCollection();
			} else if (window.localStorage.getItem("collectionId")) {
				this.$accessor.loadCollection();
			} else {
				window.document.body.style.overflow = "hidden";
				this.$accessor.setModal(Modal.LOADCOLLECTION);
			}
		}

		changeMode(mode: string) {
			window.scroll(0, 0);
			this.$accessor.setMobileMode(mode);
		}
	}
</script>
