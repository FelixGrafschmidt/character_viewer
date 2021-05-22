<template>
	<div class="w-[50%] flex gap-3 items-center justify-end mr-4">
		<span> {{ $accessor.collection.id }} </span>
		<MoeButton :text="copyText" @click.native="copyID" />
		<MoeButton text="Load Collection" @click.native="loadCollection" />
		<MoeButton text="Export Collection" @click.native="exportCollection" />
	</div>
</template>

<script lang="ts">
	import { Component, Vue } from "nuxt-property-decorator";
	import { saveAs } from "file-saver";
	import { Modal } from "~/models/enums/Modal";
	import { Collection } from "~/models/interfaces/Collection";

	@Component({
		components: {},
		name: "MoeCollectionArea",
	})
	export default class MoeCollectionArea extends Vue {
		copyText = "Copy ID";

		get collection() {
			return this.$accessor.collection;
		}

		loadCollection() {
			window.document.body.style.overflow = "hidden";
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
