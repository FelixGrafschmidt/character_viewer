<template>
	<div @click.stop class="rounded-2xl dark:bg-gray-800 bg-gray-400 dark:text-gray-100 text-gray-900 grid relative m-auto pb-10">
		<div class="mt-12 px-16">
			{{ $t("modals.delete_list.title", [list.name, list.characters.length]) }}
		</div>
		<div class="flex m-auto pt-4">
			<MoeButtonDark
				@click.native="deleteList(list.id)"
				class="mr-8 !bg-red-400 dark:!bg-red-600 dark-hover:!bg-red-700 hover:!bg-red-500 !text-color-unset"
			>
				{{ $t("list.delete") }}
			</MoeButtonDark>
			<MoeButtonDark @click.native="$vxm.main.deactivateModal()"> {{ $t("modals.delete_list.cancel") }} </MoeButtonDark>
		</div>
		<div
			@click="$vxm.main.deactivateModal()"
			class="
				items-center
				justify-center
				top-1
				right-1
				flex
				dark:bg-red-600
				bg-red-400
				dark-hover:bg-red-700
				hover:bg-red-500
				dark:text-gray-900
				text-gray-100
				h-6
				w-6
				rounded-2xl
				cursor-pointer
				absolute
			"
		>
			<div class="fas fa-times"></div>
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
