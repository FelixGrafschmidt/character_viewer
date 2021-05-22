<template>
	<div class="flex mt-7 justify-center mb-20">
		<MoeButton :text="'Create New List'" class="w-64 mr-2" color="dark:bg-gray-600 bg-gray-400" @click.native="addNewList" />
		<MoeButton :text="'Import List'" class="w-64" color="dark:bg-gray-600 bg-gray-400" @click.native="importFromFile" />
	</div>
</template>

<script lang="ts">
	import { Component, Vue } from "nuxt-property-decorator";
	import { Modal } from "~/models/enums/Modal";

	@Component({
		components: {},
		name: "MoeCollectionActions",
	})
	export default class MoeCollectionActions extends Vue {
		importFromFile(): void {
			window.document.body.style.overflow = "hidden";
			this.$vxm.main.setModal(Modal.IMPORTLIST);
		}

		addNewList() {
			this.$vxm.main.setModal(Modal.NEWLIST);
		}
	}
</script>
