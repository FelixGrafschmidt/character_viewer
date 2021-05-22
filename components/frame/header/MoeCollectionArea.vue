<template>
	<div class="w-[50%] flex gap-3 items-center justify-end mr-4">
		<span> {{ $vxm.main.collectionStore.collection.id }} </span>
		<MoeButton :text="copyText" @click.native="copyID" />
		<MoeButton text="Load Collection" @click.native="loadCollection" />
		<MoeButton text="Export Collection" @click.native="exportCollection" />
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
		copyText = "Copy ID";

		get collection() {
			return this.$vxm.main.collectionStore.collection;
		}

		loadCollection() {
			window.document.body.style.overflow = "hidden";
			this.$vxm.main.setModal(Modal.LOADCOLLECTION);
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
