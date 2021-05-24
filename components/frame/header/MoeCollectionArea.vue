<template>
	<div class="w-[50%] flex gap-3 items-center justify-end mr-4">
		<span> {{ $vxm.main.collectionStore.collection.id }} </span>
		<MoeButton v-if="copied" :text="$t('collection.copied')" @click.native="copyID" />
		<MoeButton v-else :text="$t('collection.copy_id')" @click.native="copyID" />
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
