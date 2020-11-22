<template>
	<edit-character v-if="editCharacterActive" @save-character="saveCharacter" @delete-character="deleteCharacter" />
	<div v-else class="moe-table-wrapper">
		<div class="columns is-centered new-character-button">
			<b-button class="column is-2" label="New character" @click="createNewCharacter" />
		</div>
		<b-table v-if="list.characters.length" scrollable :sticky-header="true" focusable striped :data="list.characters" @click="editCharacter">
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
	import EditCharacter from "@/components/EditCharacter.vue";
	import { Character, newCharacter } from "~/models/interfaces/Character";
	@Component({
		components: { EditCharacter },
		name: "characters",
		middleware: "routeguard",
	})
	export default class Characters extends Vue {
		editCharacterActive = false;
		list = this.$accessor.list;

		createNewCharacter() {
			const character = newCharacter();
			this.$accessor.setCharacter(character);
			this.$accessor.addCharacter({ newCharacter: this.$accessor.character });
			this.editCharacterActive = true;
		}

		editCharacter(character: Character) {
			this.$accessor.setCharacter(character);
			this.editCharacterActive = true;
		}

		saveCharacter() {
			this.editCharacterActive = false;
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
	.table-image {
		height: auto;
		max-height: 8rem;
	}
	::v-deep tbody tr {
		cursor: pointer;
	}
	::v-deep .table-wrapper {
		min-height: 80vh;
	}
	::v-deep .table-wrapper::-webkit-scrollbar {
		width: 0.2em;
	}
	::v-deep .table-wrapper::-webkit-scrollbar-track {
		-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
		box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
	}
	::v-deep .table-wrapper::-webkit-scrollbar-thumb {
		background-color: var(--color-secondary);
		outline: 1px solid black;
	}
	::v-deep .b-table .table:focus {
		border: none;
		outline: none;
		box-shadow: none;
	}
</style>
