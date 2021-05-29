<template>
	<div class="flex mt-7 justify-center mb-20 gap-2">
		<MoeTooltip :text="$t('list.create')" position="top">
			<MoeButtonLight @click.native="addNewList" icon="fas fa-plus" class="w-24" />
		</MoeTooltip>
		<MoeTooltip :text="$t('list.import')" position="top">
			<MoeButtonLight @click.native="importFromFile" icon="fas fa-file-import" class="w-24" />
		</MoeTooltip>
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
