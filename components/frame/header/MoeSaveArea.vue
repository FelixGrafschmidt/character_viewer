<template>
	<div class="flex gap-3 items-center">
		<div class="flex font-medium items-center gap-1">
			{{ $t("header.autosave.title") }}
			<p v-if="autosave" class="dark:text-green-400 text-green-700">{{ countdown }}</p>
			<p v-else class="text-red-600">{{ $t("header.autosave.off") }}</p>
		</div>

		<MoeButtonDark v-if="autosave" @click.native="disableAutosave"> {{ $t("header.autosave.disable") }} </MoeButtonDark>
		<MoeButtonDark v-else @click.native="enableAutosave"> {{ $t("header.autosave.enable") }} </MoeButtonDark>
		<div class="has-tooltip flex flex-col items-center">
			<MoeButtonDark @click.native="saveChanges" class="fas fa-save"></MoeButtonDark>
			<span class="tooltip bg-gray-700 dark:bg-gray-700 rounded w-20 text-center mx-auto mt-10 p-1">{{
				$t("header.autosave.save")
			}}</span>
		</div>

		<div v-if="changes" class="text-lg font-medium max-w-[2rem] 2xl:max-w-none has-tooltip">
			<div class="text-red-600 z-90">{{ $t("header.autosave.unsaved") }}</div>
		</div>
	</div>
</template>

<script lang="ts">
	import { Component, Vue } from "nuxt-property-decorator";
	import { Modal } from "~/models/enums/Modal";
	import { getHash } from "~/models/interfaces/Collection";

	@Component({
		components: {},
		name: "MoeSaveArea",
	})
	export default class MoeSaveArea extends Vue {
		autosave = false;
		autosaveId = 0;
		countdown = 60;

		get collection() {
			return this.$vxm.main.collectionStore.collection;
		}

		get changes() {
			return this.$vxm.main.collectionStore.originalHash !== getHash(this.collection || {});
		}

		// Lifecycle
		mounted() {
			this.performAutosave();
		}

		beforeDestroy() {
			window.clearInterval(this.autosaveId);
		}

		enableAutosave() {
			this.autosave = true;
			this.countdown = 60;
		}

		disableAutosave() {
			this.autosave = false;
			this.countdown = 60;
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

		performAutosave() {
			this.autosaveId = window.setInterval(() => {
				this.countdown--;
				if (this.autosave && this.countdown === 0) {
					this.$vxm.main.collectionStore.saveChanges(this.$axios);
					this.countdown = 60;
				}
			}, 1000 * 1);
		}
	}
</script>
