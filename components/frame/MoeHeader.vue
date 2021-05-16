<template>
	<nav
		class="dark:bg-gray-800 bg-gray-500 pl-2 min-w-full flex items-center justify-between h-16"
		role="navigation"
		aria-label="main navigation"
	>
		<MoeButton :icon-class-names="$colorMode.preference === 'light' ? 'fas fa-moon' : 'fas fa-sun'" @click.native="changeMode" />
		<div class="flex-1 flex items-center justify-start pl-4">
			<nuxt-link v-slot="{ navigate }" custom to="/">
				<h2 class="text-2xl cursor-pointer title caps-small" role="link" @click="navigate" @keypress.enter="navigate">
					Character List Manager
				</h2>
			</nuxt-link>
			<div class="ml-6">
				<div class="flex gap-4">
					<div class="flex-row flex px-3 py-2 font-medium">
						Autosave:&nbsp;
						<p v-if="autosave" class="dark:text-green-400 text-green-700">{{ countdown }}</p>
						<p v-else class="text-red-600">off</p>
					</div>

					<MoeButton v-if="autosave" :text="'Disable autosave'" @click.native="disableAutosave"> </MoeButton>
					<MoeButton v-else :text="'Enable autosave'" @click.native="enableAutosave"> </MoeButton>
					<MoeButton :text="'Save'" @click.native="saveChanges"> </MoeButton>

					<div v-if="changes" class="px-3 py-2 text-lg font-medium">
						<div class="text-red-600">UNSAVED CHANGES</div>
					</div>
				</div>
			</div>
		</div>
		<div
			role="menu"
			aria-orientation="vertical"
			aria-labelledby="options-menu"
			class="flex flex-col h-32 mt-16 w-[25rem] mr-2"
			@mouseenter="showLoadCollection = true"
			@mouseleave="showLoadCollection = false"
		>
			<div class="h-16 flex">
				<span class="pt-5 pb-4"> {{ $accessor.collection.id }} </span>
				<MoeButton class="ml-2 my-2" :text="copyText" @click.native="copyID" />
			</div>
			<div
				v-if="showLoadCollection"
				class="
					dark:bg-gray-800
					bg-gray-500
					cursor-pointer
					flex
					justify-center
					items-center
					border-t
					dark:border-yellow-300
					border-yellow-400
					h-16
				"
				@click="loadCollection"
			>
				Load Collection
			</div>
		</div>
	</nav>
</template>

<script lang="ts">
	import { Component, Vue } from "nuxt-property-decorator";
	import { Collection, getHash } from "@/models/interfaces/Collection";
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
			this.countdownId = 0;
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
	}
</script>

<style lang="postcss" scoped>
	.title {
		font-family: "Alfa Slab One", cursive;
		letter-spacing: 1px;
	}
</style>
