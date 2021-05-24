<template>
	<div class="flex flex-col">
		<MoeCollectionHeader />
		<MoeCollectionLists />
		<MoeCollectionActions />
	</div>
</template>

<script lang="ts">
	// Vue basics
	import { Component, Vue } from "nuxt-property-decorator";
	import { Modal } from "~/models/enums/Modal";
	@Component({
		components: {},
		name: "collection",
		middleware: ["resetCharacter"],
	})
	export default class Collection extends Vue {
		async mounted() {
			const url = new URL(window.location.href);
			const path = url.pathname.split("/");
			const collectionid = path[1];
			if (!collectionid.match(/\b[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}\b/)) {
				this.$router.push(this.$vxm.main.navigationPaths.collection);
			}
			const oldId = window.localStorage.getItem("collectionId");
			window.localStorage.setItem("collectionId", collectionid);
			await this.$vxm.main.collectionStore.loadCollection(this.$axios);
			if (this.$vxm.main.collectionStore.collection.lists.length === 0 && oldId) {
				window.localStorage.setItem("collectionId", oldId);
			}
			await this.$vxm.main.collectionStore.loadCollection(this.$axios);
			if (this.$vxm.main.collectionStore.collection.lists.length === 0) {
				this.$vxm.main.setModal(Modal.NEWLIST);
			}
		}
	}
</script>
