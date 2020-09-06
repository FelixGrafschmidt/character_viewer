<template>
	<div class="moe-table-wrapper">
		<b-table v-if="list.characters.length" class="moe-table" :data="list" :columns="columns"></b-table>
		<b-button class="moe-button" expanded label="New character" />
	</div>
</template>

<script lang="ts">
	// Vue basics
	import { Component, Vue } from "nuxt-property-decorator";
	import { List } from "~/models/List";
	@Component({
		components: {},
		name: "characters",
	})
	export default class Characters extends Vue {
		private list: List = this.$accessor.list;
		private columns: Array<{ field: string; label: string; width?: string; numeric?: boolean; centered?: boolean }> = [{ field: "name", label: "Name" }];
	}
</script>

<style lang="scss" scoped>
	.moe-table-wrapper {
		margin-top: 2rem;
		width: 20vw;
	}
</style>
