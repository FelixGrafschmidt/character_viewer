<template>
	<new-character v-if="newCharacterActive" @save-new-character="saveNewCharacter" @discard-character="discardCharacter" />
	<edit-character v-else-if="editCharacterActive" @save-character="saveCharacter" @delete-character="deleteCharacter" />
	<div v-else class="moe-table-wrapper">
		<div class="columns is-centered new-character-button">
			<b-button class="column is-2" label="New character" @click="newCharacterActive = true" />
		</div>
		<b-table v-if="list.characters.length" focusable striped :data="list.characters" @click="editCharacter">
			<b-table-column v-slot="props" field="name" label="Name" width="40%">
				{{ props.row.name }}
			</b-table-column>
			<b-table-column v-slot="props" field="origin" label="Origin" width="40%">
				{{ props.row.origin }}
			</b-table-column>
			<b-table-column v-slot="props" field="mainImage" label="Main Image" width="10%">
				<img v-if="props.row.images.length" :alt="props.row.name" class="table-image" :src="getMainImage(props.row)" />
			</b-table-column>
		</b-table>
	</div>
</template>

<script lang="ts">
	// Vue basics
	import { Component, Vue } from "nuxt-property-decorator";
	import NewCharacter from "@/components/NewCharacter.vue";
	import EditCharacter from "@/components/EditCharacter.vue";
	import { Character, newCharacter } from "~/models/interfaces/Character";
	@Component({
		components: { NewCharacter, EditCharacter },
		name: "characters",
		middleware: "routeguard",
	})
	export default class Characters extends Vue {
		newCharacterActive = false;
		editCharacterActive = false;
		list = this.$accessor.list;

		editCharacter(character: Character) {
			this.$accessor.setCharacter(character);
			this.editCharacterActive = true;
		}

		saveCharacter() {
			this.editCharacterActive = false;
		}

		saveNewCharacter(character: Character) {
			this.$accessor.addCharacter(character);
			this.newCharacterActive = false;
		}

		discardCharacter() {
			this.newCharacterActive = false;
		}

		deleteCharacter(character: Character) {
			this.$accessor.setCharacter(newCharacter(""));
			this.$accessor.deleteCharacter(character);
			this.editCharacterActive = false;
		}

		getMainImage(character: Character) {
			return character.images.filter((image) => {
				return image.main;
			})[0].src;
		}
	}
</script>

<style lang="scss" scoped>
	.moe-table-wrapper {
		min-width: 80vw;
		max-width: 80vw;
		max-height: 75vh;
		min-height: 75vh;
		overflow-y: auto;
		overflow-x: hidden;
	}
	.table-image {
		height: auto;
		max-height: 8rem;
	}
	.new-character-button {
		margin-top: 3rem;
	}
	::v-deep .b-table .table:focus {
		border: none;
		outline: none;
		box-shadow: none;
	}
	::v-deep tbody tr {
		cursor: pointer;
	}
	.moe-table-wrapper::-webkit-scrollbar {
		width: 0.2em;
	}
	.moe-table-wrapper::-webkit-scrollbar-track {
		-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
		box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
	}
	.moe-table-wrapper::-webkit-scrollbar-thumb {
		background-color: var(--color-secondary);
		outline: 1px solid black;
	}
</style>
