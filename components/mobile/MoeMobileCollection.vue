<template>
	<div class="flex flex-col gap-4">
		<div v-if="collection.lists.length === 0" class="m-auto flex flex-col items-center">
			<p>Empty collection. Load a different one?</p>
			<MoeButton
				text="Load Collection"
				class="w-60 h-8 mt-2"
				class-names="p-1 rounded-md text-sm font-medium focus:outline-none "
				color="dark:bg-gray-600 bg-gray-400"
				@click.native="openModal()"
			/>
		</div>
		<template v-else>
			<MoeButton
				v-for="list in collection.lists"
				:key="list.id"
				class="m-auto w-60 h-12"
				class-names="p-1 rounded-md text-sm font-medium focus:outline-none "
				color="dark:bg-gray-600 bg-gray-400"
				:text="list.name"
				@click.native="selectList(list)"
			/>
		</template>
	</div>
</template>

<script lang="ts">
	import { Component, Vue } from "nuxt-property-decorator";
	import { Modal } from "~/models/enums/Modal";
	import { List } from "~/models/interfaces/List";

	@Component({
		name: "MoeMobileCollection",
	})
	export default class MoeMobileCollection extends Vue {
		get collection() {
			return this.$vxm.main.collectionStore.collection;
		}

		openModal() {
			window.document.body.style.overflow = "hidden";
			this.$vxm.main.setModal(Modal.LOADCOLLECTION);
		}

		selectList(list: List) {
			this.$vxm.main.listStore.setList(list);
			this.changeMode("list");
		}

		changeMode(mode: string) {
			window.scroll(0, 0);
			this.$vxm.main.setMobileMode(mode);
		}
	}
</script>
