<template>
	<div class="w-[50%] flex gap-3 items-center justify-end mr-4">
		<span> {{ $vxm.main.collectionStore.collection.id }} </span>
		<MoeButtonDark v-if="copied" @click.native="copyID"> {{ $t("collection.copied") }} </MoeButtonDark>
		<MoeButtonDark v-else @click.native="copyID" class="fas fa-copy" />
		<MoeButtonDark @click.native="loadCollection" class="fas fa-folder-open" />
		<MoeButtonDark @click.native="exportCollection" icon="fas fa-download" />
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
