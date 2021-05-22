<template>
	<div class="flex mb-2 sticky top-16 dark:bg-gray-600 bg-gray-400 z-[3] rounded font-extrabold text-lg">
		<div class="w-2/5 dark:border-gray-800 border-r-2 py-2 text-center cursor-pointer" @click="$vxm.main.listStore.sortListByName()">
			Name
		</div>
		<div
			class="w-2/5 dark:border-gray-800 border-r-2 border-l-2 py-2 text-center cursor-pointer"
			@click="$vxm.main.listStore.sortListByOrigin()"
		>
			Origin
		</div>
		<div class="w-1/6 dark:border-gray-800 border-r-2 border-l-2 py-2 text-center">Images</div>
		<div class="w-1/6 dark:border-gray-800 border-l-2 py-2 text-center">Main Image</div>
	</div>
</template>

<script lang="ts">
	import { Component, Vue } from "nuxt-property-decorator";

	@Component({
		components: {},
		name: "MoeListHeader",
	})
	export default class MoeListHeader extends Vue {}
</script>
