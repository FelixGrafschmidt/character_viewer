<template>
	<header class="sticky top-0 dark:bg-gray-900 bg-gray-100 pb-2">
		<div v-if="mobileMode === 'character'" class="flex flex-col gap-4">
			<div class="m-auto">{{ character.name }}</div>
			<MoeButton
				text="Back"
				class="m-auto w-60 h-8"
				class-names="p-1 rounded-md text-sm font-medium focus:outline-none "
				color="dark:bg-gray-600 bg-gray-400"
				@click.native="$vxm.main.setMobileMode('list')"
			/>
		</div>
		<div v-else-if="mobileMode === 'list'" class="flex flex-col gap-4">
			<div class="m-auto">{{ list.name }}</div>
			<MoeButton
				text="Back"
				class="m-auto w-60 h-8"
				class-names="p-1 rounded-md text-sm font-medium focus:outline-none "
				color="dark:bg-gray-600 bg-gray-400"
				@click.native="$vxm.main.setMobileMode('collection')"
			/>
		</div>
		<div v-else-if="collection.lists.length > 0" class="flex flex-col gap-4">
			<span class="m-auto">{{ collection.id }}</span>
		</div>
	</header>
</template>

<script lang="ts">
	import { Component, Vue } from "nuxt-property-decorator";

	@Component({
		name: "MoeMobileHeader",
	})
	export default class MoeMobileHeader extends Vue {
		get collection() {
			return this.$vxm.main.collectionStore.collection;
		}

		get list() {
			return this.$vxm.main.listStore.list;
		}

		get character() {
			return this.$vxm.main.characterStore.character;
		}

		get mobileMode() {
			return this.$vxm.main.mobileMode;
		}
	}
</script>
