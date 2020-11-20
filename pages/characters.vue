<template>
	<new-character v-if="newCharacterActive"> </new-character>
	<div v-else class="moe-table-wrapper">
		<b-table v-if="list.characters.length" class="moe-table" :data="list" :columns="columns"></b-table>
		<b-button class="moe-button" expanded label="New character" @click="newCharacterActive = true" />
	</div>
</template>

<script lang="ts">
	// Vue basics
	import { Component, Vue } from "nuxt-property-decorator";
	import NewCharacter from "@/components/NewCharacter.vue";
	@Component({
		components: { NewCharacter },
		name: "characters",
	})
	export default class Characters extends Vue {
		private newCharacterActive = false;
		private list = this.$accessor.list;
		private columns: Array<{ field: string; label: string; width?: string; numeric?: boolean; centered?: boolean }> = [{ field: "name", label: "Name" }];
	}
</script>

<style lang="scss" scoped>
	.moe-table-wrapper {
		margin-top: 2rem;
	}
</style>
