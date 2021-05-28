<template>
	<div @click.stop class="flex rounded-2xl dark:bg-gray-800 bg-gray-400 dark:text-gray-100 text-gray-900 relative m-auto pb-10">
		<img :alt="$t('modals.save_error.alt')" src="icons/error.svg" class="max-w-16 h-16 mt-12 ml-12" />
		<div class="mx-12">
			<div class="mt-16 text-xl flex flex-col">
				<span> {{ $t("modals.save_error.error") }}</span>
				<span>
					{{ $t("modals.save_error.not_saved") }}
				</span>
			</div>
			<div class="mt-8">
				<MoeButtonDark @click.native="saveChanges"> {{ $t("modals.save_error.try_again") }} </MoeButtonDark>
				<MoeButtonDark @click.native="exportData"> {{ $t("modals.save_error.export") }} </MoeButtonDark>
				<MoeButtonDark @click.native="contactUs"> {{ $t("modals.save_error.contact") }} </MoeButtonDark>
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
