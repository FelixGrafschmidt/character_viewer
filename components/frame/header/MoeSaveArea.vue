<template>
	<div class="flex gap-3 items-center">
		<div class="flex font-medium items-center">
			Autosave:&nbsp;
			<p v-if="autosave" class="dark:text-green-400 text-green-700">{{ countdown }}</p>
			<p v-else class="text-red-600">off</p>
		</div>

		<MoeButton v-if="autosave" :text="'Disable autosave'" @click.native="disableAutosave"> </MoeButton>
		<MoeButton v-else :text="'Enable autosave'" @click.native="enableAutosave"> </MoeButton>
		<MoeButton :text="'Save'" @click.native="saveChanges"> </MoeButton>

		<div v-if="changes" class="text-lg font-medium max-w-[2rem] 2xl:max-w-none">
			<div class="text-red-600">UNSAVED CHANGES</div>
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
			return this.$accessor.collection;
		}

		get changes() {
			return this.$accessor.originalHash !== getHash(this.collection);
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
			this.$accessor.setLoading(true);
			return this.$accessor
				.saveChanges()
				.then(() => {
					this.$accessor.deactivateModal();
				})
				.catch(() => {
					window.document.body.style.overflow = "hidden";
					this.$accessor.setModal(Modal.SAVEERROR);
				})
				.finally(() => {
					this.$accessor.setLoading(false);
				});
		}

		performAutosave() {
			this.autosaveId = window.setInterval(() => {
				this.countdown--;
				if (this.autosave && this.countdown === 0) {
					this.$accessor.saveChanges();
					this.countdown = 60;
				}
			}, 1000 * 1);
		}
	}
</script>
