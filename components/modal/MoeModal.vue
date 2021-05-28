<template>
	<div v-if="show">
		<div
			class="dark:bg-gray-900 bg-gray-100 absolute z-20 h-screen w-[100vw] grid opacity-75 inset-0"
			aria-role="dialog"
			aria-modal
		></div>
		<div class="absolute inset-0 flex justify-center items-center z-30" @click="$vxm.main.deactivateModal()">
			<component :is="component" />
		</div>
	</div>
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
			return this.$vxm.main.modal;
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
				case Modal.NEWLIST:
					return "MoeNewList";
				case Modal.FULLSCREENIMG:
					return "MoeFullscreenImg";
				case Modal.TUTORIAL:
					return "MoeTutorial";
				default:
					return "";
			}
		}
	}
</script>
