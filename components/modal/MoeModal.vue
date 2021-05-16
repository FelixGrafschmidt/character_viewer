<template>
	<div v-if="show">
		<div
			class="dark:bg-gray-900 bg-gray-100 absolute z-10 h-screen w-screen grid opacity-75 inset-0"
			aria-role="dialog"
			aria-modal
		></div>
		<div class="absolute inset-0 flex justify-center items-center z-20">
			<component :is="component" />
		</div>
	</div>
	<div v-else></div>
</template>

<script lang="ts">
	import { Component, Vue } from "nuxt-property-decorator";
	import { Modal } from "~/models/enums/Modal";

	@Component({
		components: {},
		name: "MoeModal",
	})
	export default class MoeModal extends Vue {
		get show() {
			return this.modal !== Modal.NONE;
		}

		get modal(): Modal {
			return this.$accessor.modal;
		}

		get component() {
			switch (this.modal) {
				case Modal.SAVEERROR:
					return "MoeSaveError";
				case Modal.CONTACTUS:
					return "MoeContactUs";
				case Modal.DELETELIST:
					return "MoeDeleteList";
				case Modal.DELETECHARACTER:
					return "MoeDeleteCharacter";
				case Modal.NEWIMAGE:
					return "MoeNewImage";
				case Modal.LOADCOLLECTION:
					return "MoeLoadCollection";
				case Modal.IMPORTLIST:
					return "MoeImportList";
			}
		}
	}
</script>
