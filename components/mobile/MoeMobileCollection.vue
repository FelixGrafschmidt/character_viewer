<template>
	<div class="flex flex-col gap-4">
		<div v-if="collection.lists.length === 0" class="m-auto flex flex-col items-center">
			<p>{{ $t("pages.mobile.empty_collection") }}</p>
			<MoeButtonLight @click.native="openModal()" class="w-60 h-12 mt-2"> {{ $t("collection.load") }} </MoeButtonLight>
		</div>
		<template v-else>
			<MoeButtonLight v-for="list in collection.lists" :key="list.id" @click.native="selectList(list)" class="m-auto w-60 h-12">
				{{ list.name }}
			</MoeButtonLight>
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
