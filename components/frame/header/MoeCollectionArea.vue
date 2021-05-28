<template>
	<div class="w-[50%] flex gap-3 items-center justify-end mr-4">
		<span> {{ $vxm.main.collectionStore.collection.id }} </span>
		<div v-if="copied">
			<MoeButtonDark @click.native="copyID"> {{ $t("collection.copied") }} </MoeButtonDark>
		</div>
		<div v-else class="has-tooltip flex flex-col items-center">
			<MoeButtonDark @click.native="copyID" class="fas fa-copy" />
			<span class="tooltip bg-gray-700 dark:bg-gray-700 rounded mx-auto mt-10 p-1"> {{ $t("collection.copy_id") }} </span>
		</div>
		<div class="has-tooltip flex flex-col items-center">
			<MoeButtonDark @click.native="loadCollection" class="fas fa-folder-open" />
			<span class="tooltip bg-gray-700 dark:bg-gray-700 rounded mx-auto mt-10 p-1"> {{ $t("collection.load") }} </span>
		</div>
		<div class="has-tooltip flex flex-col items-end">
			<MoeButtonDark @click.native="exportCollection" icon="fas fa-download" />
			<span class="tooltip bg-gray-700 dark:bg-gray-700 rounded mx-auto mt-10 p-1"> {{ $t("collection.export") }} </span>
		</div>
	</div>
</template>

<script lang="ts">
	import { Component, Vue } from "nuxt-property-decorator";
	import { saveAs } from "file-saver";
	import { Modal } from "~/models/enums/Modal";

	@Component({
		components: {},
		name: "MoeCollectionArea",
	})
	export default class MoeCollectionArea extends Vue {
		copied = false;

		get collection() {
			return this.$vxm.main.collectionStore.collection;
		}

		loadCollection() {
			this.$vxm.main.setModal(Modal.LOADCOLLECTION);
		}

		copyID() {
			this.copied = true;
			window.setTimeout(() => {
				this.copied = false;
			}, 1000 * 2);
			navigator.clipboard.writeText(this.collection.id);
		}

		exportCollection() {
			saveAs(new File([JSON.stringify(this.collection)], this.collection.id + ".json"));
		}
	}
</script>
