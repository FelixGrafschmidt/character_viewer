<template>
	<div class="flex rounded-2xl dark:bg-gray-700 bg-gray-400 dark:text-gray-100 text-gray-900 relative m-auto pb-10" @click.stop>
		<img src="icons/error.svg" :alt="$t('modals.save_error.alt')" class="max-w-16 h-16 mt-12 ml-12" />
		<div class="mx-12">
			<div class="mt-16 text-xl flex flex-col">
				<span> {{ $t("modals.save_error.error") }}</span>
				<span>
					{{ $t("modals.save_error.not_saved") }}
				</span>
			</div>
			<div class="mt-8">
				<MoeButton :text="$t('modals.save_error.try_again')" @click.native="saveChanges"> </MoeButton>
				<MoeButton :text="$t('modals.save_error.export')" @click.native="exportData"> </MoeButton>
				<MoeButton :text="$t('modals.save_error.contact')" @click.native="contactUs"> </MoeButton>
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
			return this.$vxm.main.collectionStore.collection;
		}

		contactUs() {
			this.$vxm.main.deactivateModal();
			window.document.body.style.overflow = "hidden";
			this.$vxm.main.setModal(Modal.CONTACTUS);
		}

		saveChanges(): Promise<void> {
			this.$vxm.main.setLoading(true);
			return this.$vxm.main.collectionStore
				.saveChanges(this.$axios)
				.then(() => {
					this.$vxm.main.deactivateModal();
				})
				.catch(() => {
					window.document.body.style.overflow = "hidden";
					this.$vxm.main.setModal(Modal.SAVEERROR);
				})
				.finally(() => {
					this.$vxm.main.setLoading(false);
				});
		}

		exportData() {
			saveAs(new File([JSON.stringify(this.collection)], this.collection.id + ".json"));
		}
	}
</script>
