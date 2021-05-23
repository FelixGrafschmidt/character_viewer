<template>
	<div class="w-[50%] flex gap-3 items-center justify-end mr-4">
		<span> {{ $vxm.main.collectionStore.collection.id }} </span>
		<MoeButton :text="copyText" @click.native="copyID" />
		<MoeButton :text="$t('collection.load')" @click.native="loadCollection" />
		<MoeButton :text="$t('collection.export')" @click.native="exportCollection" />
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
		copyText = this.$t("collection.copy_id");

		get collection() {
			return this.$vxm.main.collectionStore.collection;
		}

		loadCollection() {
			window.document.body.style.overflow = "hidden";
			this.$vxm.main.setModal(Modal.LOADCOLLECTION);
		}

		copyID() {
			this.copyText = this.$t("collection.copied");
			window.setTimeout(() => {
				this.copyText = this.$t("collection.copy_id");
			}, 1000 * 2);
			navigator.clipboard.writeText(this.collection.id);
		}

		exportCollection() {
			saveAs(new File([JSON.stringify(this.collection)], this.collection.id + ".json"));
		}
	}
</script>
