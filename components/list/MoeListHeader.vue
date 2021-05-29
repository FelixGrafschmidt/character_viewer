<template>
	<div class="flex sticky top-0 dark:bg-gray-600 bg-gray-400 z-[3] rounded font-extrabold text-lg select-none">
		<div @click="$vxm.main.listStore.sortListByName()" class="w-[35%] dark:border-gray-800 border-r-2 py-2 text-center cursor-pointer">
			{{ $t("character.name") }}
			<div
				v-if="sortcriterion === 'NAME'"
				:class="{
					'fa-arrow-down': sortorder === 'ASC',
					'fa-arrow-up': sortorder === 'DESC',
				}"
				class="fas"
			></div>
		</div>
		<div
			@click="$vxm.main.listStore.sortListByOrigin()"
			class="w-[35%] dark:border-gray-800 border-r-2 border-l-2 py-2 text-center cursor-pointer"
		>
			{{ $t("character.origin") }}
			<div
				v-if="sortcriterion === 'ORIGIN'"
				:class="{
					'fa-arrow-down': sortorder === 'ASC',
					'fa-arrow-up': sortorder === 'DESC',
				}"
				class="fas"
			></div>
		</div>
		<div
			@click="$vxm.main.listStore.sortListByImages()"
			class="w-[10%] dark:border-gray-800 border-r-2 border-l-2 py-2 text-center cursor-pointer"
		>
			{{ $t("character.images") }}
			<div
				v-if="sortcriterion === 'IMAGES'"
				:class="{
					'fa-arrow-down': sortorder === 'ASC',
					'fa-arrow-up': sortorder === 'DESC',
				}"
				class="fas"
			></div>
		</div>
		<div class="w-[10%] dark:border-gray-800 border-r-2 border-l-2 py-2 text-center">{{ $t("character.attributes") }}</div>
		<div class="w-[10%] dark:border-gray-800 border-l-2 py-2 text-center">{{ $t("character.main_image") }}</div>
	</div>
</template>

<script lang="ts">
	import { Component, Vue, Watch } from "nuxt-property-decorator";
	import { List } from "~/models/interfaces/List";

	@Component({
		components: {},
		name: "MoeListHeader",
	})
	export default class MoeListHeader extends Vue {
		sortcriterion = "";
		sortorder = "";

		get list() {
			return this.$vxm.main.listStore.list;
		}

		@Watch("list", { deep: true })
		onListChange(newList: List, _oldList: List) {
			this.sortcriterion = newList.sortcriterion;
			this.sortorder = newList.sortorder;
		}
	}
</script>
