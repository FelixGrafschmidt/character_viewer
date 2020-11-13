<template>
	<div>
		<div class="moe-table-wrapper">
			<b-table v-if="list.characters.length" class="moe-table" :data="list" :columns="columns"></b-table>
			<b-button class="moe-button" expanded label="New character" @click="newCharacterActive = true" />
		</div>
		<b-modal v-model="newCharacterActive" class="error_modal" scroll="keep" :full-screen="false" has-modal-card :destroy-on-hide="false" aria-role="dialog" aria-modal>
			<div class="card is-danger">
				<div class="card-content">
					<div class="content">
						<new-character />
					</div>
				</div>
			</div>
		</b-modal>
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
		width: 20vw;
	}
</style>
