<template>
	<div class="flex mt-7 justify-center mb-20 gap-2">
		<div class="has-tooltip flex flex-col items-center">
			<MoeButtonLight @click.native="addNewList" icon="fas fa-plus-square" class="w-24" />
			<span class="tooltip bg-gray-700 dark:bg-gray-700 rounded mx-auto mt-10 p-1"> {{ $t("list.create") }} </span>
		</div>
		<div class="has-tooltip flex flex-col items-center">
			<MoeButtonLight @click.native="importFromFile" icon="fas fa-file-import" class="w-24" />
			<span class="tooltip bg-gray-700 dark:bg-gray-700 rounded mx-auto mt-10 p-1"> {{ $t("list.import") }} </span>
		</div>
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
			this.$vxm.main.setModal(Modal.IMPORTLIST);
		}

		addNewList() {
			this.$vxm.main.setModal(Modal.NEWLIST);
		}
	}
</script>
