<template>
	<nav class="dark:bg-gray-800 bg-gray-500 pl-2 min-w-full flex items-center h-16 gap-3" role="navigation" aria-label="main navigation">
		<MoeButton
			:icon-class-names="{ 'fas fa-moon': $colorMode.preference === 'light', 'fas fa-sun': $colorMode.preference === 'dark' }"
			class="max-w-[5%]"
			@click.native="changeMode"
		/>
		<div class="w-[50%] gap-3 flex items-center justify-start">
			<nuxt-link v-slot="{ navigate }" tag="h2" custom to="/">
				<h2 class="text-xl cursor-pointer title caps-small" role="link" @click="navigate" @keypress.enter="navigate">
					Character List Manager
				</h2>
			</nuxt-link>
			<div>
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
			</div>
		</div>
		<div class="w-[50%] flex gap-3 items-center justify-end mr-4" @mouseleave="showLoadCollection = false">
			<span> {{ $accessor.collection.id }} </span>
			<MoeButton :text="copyText" @click.native="copyID" />
			<MoeButton text="Load Collection" @click.native="loadCollection" />
			<MoeButton text="Export Collection" @click.native="exportCollection" />
		</div>
	</nav>
</template>

<script lang="ts">
	import { Component, Vue } from "nuxt-property-decorator";
	import { Collection, getHash } from "@/models/interfaces/Collection";
	import { saveAs } from "file-saver";
	import { Modal } from "~/models/enums/Modal";

	@Component({
		components: {},
		name: "MoeHeader",
	})
	export default class MoeHeader extends Vue {
		// Data
		autosave = false;
		showLoadCollection = false;
		autosaveId = 0;
		countdown = 60;
		copyText = "Copy ID";

		// Computed
		get changes() {
			return this.$accessor.originalHash !== getHash(this.collection);
		}

		get collection() {
			return this.$accessor.collection;
		}

		// Lifecycle
		mounted() {
			this.performAutosave();
		}

		beforeDestroy() {
			window.clearInterval(this.autosaveId);
		}

		// Methods
		changeMode() {
			this.$colorMode.preference = this.$colorMode.preference === "light" ? "dark" : "light";
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
					this.$accessor.setModal(Modal.SAVEERROR);
				})
				.finally(() => {
					this.$accessor.setLoading(false);
				});
		}

		loadCollection() {
			this.$accessor.setModal(Modal.LOADCOLLECTION);
		}

		saveNewCollection(collection: Collection) {
			this.$axios
				.$post("saveCollection", collection, { timeout: 1000 })
				.then(() => {
					this.$accessor.deactivateModal();
				})
				.catch((error) => {
					console.error(error);
				});
			this.$accessor.setCollection(collection);
			localStorage.setItem("collectionId", collection.id);
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

		copyID() {
			this.copyText = "Copied!";
			window.setTimeout(() => {
				this.copyText = "Copy ID";
			}, 1000 * 2);
			navigator.clipboard.writeText(this.collection.id);
		}

		exportCollection() {
			saveAs(new File([JSON.stringify(this.collection)], this.collection.id + ".json"));
		}
	}
</script>

<style lang="postcss" scoped>
	.title {
		font-family: "Alfa Slab One", cursive;
		letter-spacing: 1px;
	}
</style>
