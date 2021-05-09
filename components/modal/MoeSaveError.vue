<template>
	<div class="flex rounded-2xl dark:bg-gray-700 bg-gray-400 dark:text-gray-100 text-gray-900 relative m-auto pb-10">
		<img src="icons/error.svg" alt="error" class="max-w-16 h-16 mt-12 ml-12" />
		<div class="mx-12">
			<div class="mt-16 text-xl">
				An error has occurred while saving your changes. <br />
				Your changes have
				<span class="font-bold">NOT</span>
				been saved!
			</div>
			<div class="mt-8">
				<MoeButton :text="'Try again'" @click.native="saveChanges"> </MoeButton>
				<MoeButton :text="'Export your data'" @click.native="exportData"> </MoeButton>
				<MoeButton :text="'Contact us'" @click.native="contactUs"> </MoeButton>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
	import { Component, Vue } from "nuxt-property-decorator";
	import { saveAs } from "file-saver";
	import { Modal } from "~/models/enums/Modal";

	@Component({
		components: {},
		name: "ModalMoeSaveError",
	})
	export default class ModalMoeSaveError extends Vue {
		get collection() {
			return this.$accessor.collection;
		}

		contactUs() {
			this.$accessor.deactivateModal();
			this.$accessor.setModal(Modal.CONTACTUS);
		}

		saveChanges(): Promise<void> {
			this.$accessor.setLoading(true);
			return this.$accessor
				.saveChanges()
				.then(() => {
					this.$accessor.deactivateModal();
				})
				.catch(() => {
					this.$accessor.setModal(Modal.SAVEERROR);
				})
				.finally(() => {
					this.$accessor.setLoading(false);
				});
		}

		exportData() {
			saveAs(new File([JSON.stringify(this.collection)], this.collection.id + ".json"));
		}
	}
</script>
