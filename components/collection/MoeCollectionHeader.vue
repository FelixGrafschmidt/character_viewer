<template>
	<div class="flex sticky top-0 dark:bg-gray-600 bg-gray-400 z-[3] rounded font-extrabold text-lg">
		<div class="py-2 w-2/5 dark:border-gray-800 border-r-2 text-center">{{ $t("list.id") }}</div>
		<div class="py-2 w-2/5 dark:border-gray-800 border-r-2 border-l-2 text-center">{{ $t("list.name") }}</div>
		<div class="py-2 w-1/6 dark:border-gray-800 border-r-2 border-l-2 text-center">{{ $t("list.content") }}</div>
		<div class="py-2 w-1/6 dark:border-gray-800 border-l-2"></div>
	</div>
</template>

<script lang="ts">
	import { Component, Vue } from "nuxt-property-decorator";

	@Component({
		components: {},
		name: "MoeCollectionHeader",
	})
	export default class MoeCollectionHeader extends Vue {}
</script>
