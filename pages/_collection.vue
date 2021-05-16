<template>
	<div></div>
</template>

<script lang="ts">
	import { Component, Vue } from "nuxt-property-decorator";
	@Component({
		components: {},
		name: "collection",
	})
	export default class Collection extends Vue {
		async mounted() {
			const url = new URL(window.location.href);
			const path = url.pathname.split("/");
			const collectionid = path[1];
			if (!collectionid.match(/\b[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}\b/)) {
				this.$router.push("/lists");
			}
			const oldId = window.localStorage.getItem("collectionId");
			window.localStorage.setItem("collectionId", collectionid);
			await this.$accessor.loadCollection();
			if (this.$accessor.collection.lists.length === 0 && oldId) {
				window.localStorage.setItem("collectionId", oldId);
			}
			await this.$accessor.loadCollection();
			this.$router.push("/lists");
		}
	}
</script>
