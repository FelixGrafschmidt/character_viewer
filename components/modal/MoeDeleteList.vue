<template>
	<div class="rounded-2xl dark:bg-gray-700 bg-gray-400 dark:text-gray-100 text-gray-900 grid relative m-auto pb-10" @click.stop>
		<div class="mt-12 px-16">
			{{ $t("modals.delete_list.title", [list.name, list.characters.length]) }}
		</div>
		<div class="flex m-auto pt-4">
			<MoeButton class="mr-8" color="bg-red-500" :text="$t('list.delete')" @click.native="deleteList(list.id)" />
			<MoeButton :text="$t('modals.delete_list.cancel')" @click.native="$vxm.main.deactivateModal()" />
		</div>
		<div
			class="
				top-1
				right-1
				dark:bg-red-500
				dark:text-gray-900
				bg-red-800
				text-gray-100
				h-6
				w-6
				text-center
				rounded-2xl
				ml-24
				cursor-pointer
				absolute
			"
			@click="$vxm.main.deactivateModal()"
		>
			X
		</div>
	</div>
</template>

<script lang="ts">
	import { Component, Vue } from "nuxt-property-decorator";

	@Component({
		components: {},
		name: "MoeDeleteList",
	})
	export default class MoeDeleteList extends Vue {
		get list() {
			return this.$vxm.main.collectionStore.listToDelete;
		}

		deleteList(id: string) {
			this.$vxm.main.collectionStore.deleteList(id);
			this.$vxm.main.deactivateModal();
		}
	}
</script>
