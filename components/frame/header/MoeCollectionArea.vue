<template>
	<div class="w-[50%] flex gap-3 items-center justify-end mr-4">
		<span> {{ $vxm.main.collectionStore.collection.id }} </span>
		<div v-if="copied">
			<MoeButtonDark @click.native="copyID"> {{ $t("collection.copied") }} </MoeButtonDark>
		</div>
		<MoeTooltip v-else :text="$t('collection.copy_id')">
			<MoeButtonDark @click.native="copyID" icon="fas fa-copy" class="h-10 w-10" />
		</MoeTooltip>
		<MoeTooltip :text="$t('collection.load')">
			<MoeButtonDark @click.native="loadCollection" icon="fas fa-folder-open" class="h-10 w-10" />
		</MoeTooltip>
		<MoeTooltip :text="$t('collection.export')" extra-classes="">
			<MoeButtonDark @click.native="exportCollection" icon="fas fa-download" class="h-10 w-10" />
		</MoeTooltip>
		<MoeTooltip :text="$t('collection.unload')" extra-classes="mr-16" class="">
			<MoeButtonDark
				@click.native="unloadCollection"
				icon="fas fa-times"
				class="dark-hover:!bg-red-700 hover:!bg-red-500 !text-color-unset h-10 w-10"
			/>
		</MoeTooltip>
	</div>
</template>

<script lang="ts">
	import { Component, Vue } from "nuxt-property-decorator";
	import { saveAs } from "file-saver";
	import { Modal } from "~/models/enums/Modal";
	import { newCollection } from "~/models/interfaces/Collection";

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

		unloadCollection() {
			this.$vxm.main.collectionStore.setCollection(newCollection());
		}
	}
</script>
