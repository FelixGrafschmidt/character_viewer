<template>
	<div>
		<!-- <moe-navigation v-if="mode === 'manager'">
			<moe-navigation-option v-if="collection.id" slot="start" :text="'Collection id: ' + collection.id" tag="div"></moe-navigation-option>
		</moe-navigation>
		<moe-navigation v-else-if="mode === 'editor'">
			<moe-navigation-option slot="start" :text="'Open list manager'" @click.native="mode = 'manager'"></moe-navigation-option>
		</moe-navigation>
		<moe-navigation v-else-if="mode === 'carousel'">
			<b-navbar-dropdown slot="start" :label="currentList !== undefined ? currentList.name : 'Your lists'">
				<template v-if="collection.lists.length > 0">
					<b-navbar-item v-for="list in collection.lists" :key="list.id" @click.native="currentList = list">
						{{ (currentList.id === list.id ? "> " : "") + list.name }}
					</b-navbar-item>
				</template>
			</b-navbar-dropdown>
			<moe-navigation-option slot="start" :text="'Open list manager'" @click.native="mode = 'manager'"></moe-navigation-option>
			<moe-navigation-option v-if="currentList !== undefined" slot="start" :text="'Add new character'" @click.native="addNewCharacter"></moe-navigation-option>
			<moe-navigation-option v-if="currentList.characters.length > 0" slot="start" :text="'Edit this character'" @click.native="editThisCharacter"></moe-navigation-option>
			<b-navbar-dropdown slot="end" label="Display mode">
				<b-navbar-item>
					{{ "> Carousel" }}
				</b-navbar-item>
				<b-navbar-item @click.native="mode = 'table'">
					{{ "Table" }}
				</b-navbar-item>
			</b-navbar-dropdown>
		</moe-navigation>
		<moe-navigation v-else-if="mode === 'table'">
			<b-navbar-dropdown slot="start" :label="currentList !== undefined ? currentList.name : 'Your lists'">
				<template v-if="collection.lists.length > 0">
					<b-navbar-item v-for="list in collection.lists" :key="list.id" @click.native="currentList = list">
						{{ (currentList.id === list.id ? "> " : "") + list.name }}
					</b-navbar-item>
				</template>
			</b-navbar-dropdown>
			<moe-navigation-option slot="start" :text="'Open list manager'" @click.native="mode = 'manager'"></moe-navigation-option>
			<b-navbar-dropdown slot="end" label="Display mode">
				<b-navbar-item @click.native="mode = 'carousel'">
					{{ "Carousel" }}
				</b-navbar-item>
				<b-navbar-item>
					{{ "> Table" }}
				</b-navbar-item>
			</b-navbar-dropdown>
		</moe-navigation>
		<moe-viewer v-if="mode === 'carousel'" :start-position="currentList.characters.indexOf(currentCharacter)" :characters="currentList.characters" @change-character="updateCurrentCharacter" />
		<moe-table v-if="mode === 'table'" :characters="currentList.characters" @new-character="addNewCharacter" @changed="saveCollection" />
		<moe-editor v-if="mode === 'editor'" :is-new-character="isNewCharacter" :character-to-edit="characterToEdit" :characters="currentList.characters" @changed="saveCollection" @close="mode = determineViewMode()" />
		<moe-list-manager v-if="mode === 'manager'" :collection="collection" @open-list="openList($event)"> </moe-list-manager> -->
	</div>
</template>
<script lang="ts">
	// // Vue basics
	import {
		Vue,
		Component,
		//  Component
	} from "nuxt-property-decorator";
	// // Vue components
	// import { isMobile } from "mobile-device-detect";
	// import { v4 as uuidv4 } from "uuid";
	// import MoeViewer from "@/components/viewer/MoeViewer.vue";
	// import MoeTable from "@/components/viewer/MoeTable.vue";
	// import MoeEditor from "@/components/editor/MoeEditor.vue";
	// import MoeNavigation from "@/components/navigation/MoeNavigation.vue";
	// import MoeNavigationOption from "@/components/navigation/MoeNavigationOption.vue";
	// import MoeListManager from "@/components/manager/MoeListManager.vue";
	// // 3rdParty
	// // models
	// import { Character } from "@/models/Character";
	// import { List } from "@/models/List";
	// import { Collection } from "@/models/Collection";
	// // services
	// import { saveCollection, loadCollection } from "@/services/AjaxService";

	// @Component({
	// 	components: {
	// 		MoeNavigation,
	// 		MoeNavigationOption,
	// 		MoeViewer,
	// 		MoeTable,
	// 		MoeEditor,
	// 		MoeListManager,
	// 	},
	// })
	@Component({ layout: "default" })
	export default class MoeApp extends Vue {
		// 	private created(): void {
		// 		const collectionIdFromUrl = window.location.pathname.substr(1);
		// 		const collectionIdFromLocalStorage = localStorage.getItem("collectionId");
		// 		let collectionId;
		// 		if (collectionIdFromUrl !== "" && collectionIdFromUrl.match(/[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/)) {
		// 			collectionId = collectionIdFromUrl;
		// 		} else if (collectionIdFromLocalStorage !== null) {
		// 			collectionId = collectionIdFromLocalStorage;
		// 		}
		// 		if (collectionId !== undefined) {
		// 			this.loadInitialCollection(collectionId);
		// 		} else {
		// 			this.$buefy.dialog.confirm({
		// 				message: "What do you want to do?",
		// 				confirmText: "Load collection",
		// 				cancelText: "New collection",
		// 				type: "is-link",
		// 				title: "",
		// 				canCancel: ["button"],
		// 				onConfirm: () => {
		// 					this.loadCollection("Enter the id of the collection you wish to load.");
		// 				},
		// 				onCancel: () => {
		// 					this.collection.id = uuidv4();
		// 				},
		// 			});
		// 		}
		// 	}
		// 	private mode: string = "manager";
		// 	private collection: Collection = { id: "", lists: [] };
		// 	private currentCharacter: Character = {
		// 		name: "",
		// 		variants: [],
		// 		partners: [],
		// 		detailsOpened: false,
		// 		editing: false,
		// 	};
		// 	private characterToEdit: Character = {
		// 		name: "",
		// 		variants: [],
		// 		partners: [],
		// 		detailsOpened: false,
		// 		editing: false,
		// 	};
		// 	private isNewCharacter: boolean = false;
		// 	private currentList: List = {
		// 		name: "My list",
		// 		id: uuidv4(),
		// 		characters: [],
		// 	};
		// 	private addNewCharacter(): void {
		// 		this.characterToEdit = {
		// 			name: "",
		// 			variants: [],
		// 			partners: [],
		// 			detailsOpened: false,
		// 			editing: false,
		// 		};
		// 		this.isNewCharacter = true;
		// 		this.mode = "editor";
		// 	}
		// 	private editThisCharacter(): void {
		// 		this.characterToEdit = this.currentCharacter;
		// 		this.isNewCharacter = false;
		// 		this.mode = "editor";
		// 	}
		// 	private updateCurrentCharacter(index: number): void {
		// 		this.currentCharacter = this.currentList.characters[index];
		// 	}
		// 	private saveCollection() {
		// 		saveCollection(this.collection).catch((error) => {
		// 			console.error(error);
		// 		});
		// 	}
		// 	private loadInitialCollection(id: string) {
		// 		loadCollection(id)
		// 			.then((response) => {
		// 				this.collection = response.data;
		// 				if (this.collection.lists.length === 1) {
		// 					this.currentList = this.collection.lists[0];
		// 					this.mode = this.determineViewMode();
		// 				}
		// 			})
		// 			.catch(() => {
		// 				this.$buefy.dialog.confirm({
		// 					message: "What do you want to do?",
		// 					confirmText: "Load collection",
		// 					cancelText: "New collection",
		// 					type: "is-link",
		// 					title: "",
		// 					canCancel: ["button"],
		// 					onConfirm: () => {
		// 						this.loadCollection("Enter the id of the collection you wish to load");
		// 					},
		// 					onCancel: () => {
		// 						this.collection.id = uuidv4();
		// 					},
		// 				});
		// 			});
		// 	}
		// 	private loadCollection(message: string) {
		// 		this.$buefy.dialog.prompt({
		// 			message,
		// 			title: "Load collection",
		// 			type: "is-link",
		// 			confirmText: "Load",
		// 			onConfirm: (value) => {
		// 				loadCollection(value)
		// 					.then((response) => {
		// 						this.collection = response.data;
		// 					})
		// 					.catch(() => {
		// 						this.loadCollection("The collection could not be loaded. Please try a different id.");
		// 					});
		// 			},
		// 		});
		// 	}
		// 	private determineViewMode(): string {
		// 		if (isMobile) {
		// 			return "carousel";
		// 		} else {
		// 			return "table";
		// 		}
		// 	}
		// 	private openList(list: List): void {
		// 		this.currentList = list;
		// 		this.mode = this.determineViewMode();
		// 	}
	}
</script>
<style lang="scss">
	// /deep/ .modal-card-foot > .button {
	// 	font-size: smaller !important;
	// }
</style>
