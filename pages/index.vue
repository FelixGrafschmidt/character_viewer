<template>
	<div class="mt-4">
		<h2 class="text-xl font-bold">{{ $t("pages.index.returning") }}</h2>
	</div>
</template>

<script lang="ts">
	import { Component, Vue } from "nuxt-property-decorator";
	import { Modal } from "~/models/enums/Modal";

	@Component({
		components: {},
		name: "index",
		middleware: ["resetCharacter"],
	})
	export default class Index extends Vue {
		get tutorial() {
			return this.$vxm.main.tutorial;
		}

		mounted() {
			const lsTutorial = window.localStorage.getItem("tutorial");
			if (lsTutorial) {
				this.$vxm.main.setTutorial(parseInt(lsTutorial));
			}
			if (this.tutorial < 2) {
				this.$vxm.main.setModal(Modal.TUTORIAL);
			}
		}
	}
</script>
