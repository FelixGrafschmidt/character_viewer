<template>
	<div class="flex flex-col">
		<MoeListHeader />
		<MoeListCharacters />
		<MoeListActions />
	</div>
</template>

<script lang="ts">
	// Vue basics
	import { Component, Vue } from "nuxt-property-decorator";
	@Component({
		name: "list",
		middleware: ["resetCharacter"],
	})
	export default class List extends Vue {
		mounted() {
			const url = new URL(window.location.href);
			const path = url.pathname.split("/");
			const listid = path[2];
			const list = this.$vxm.main.collectionStore.collection.lists.filter((list) => list.id === listid);
			if (list.length === 0) {
				this.$vxm.main.toCollection({ router: this.$router, keepCollection: false });
			}
			this.$vxm.main.listStore.setList(list[0]);
		}
	}
</script>
