<template>
	<div>
		<div class="columns section wrapper">
			<b-table ref="table" class="column is-half is-offset-3" :data="collection.lists">
				<b-table-column v-slot="props" field="id" label="ID" width="150">
					<div class="text-column">
						<a @click="openList(props.row)">{{ props.row.id }}</a>
					</div>
				</b-table-column>
				<b-table-column v-slot="props" field="name" label="Name" width="150">
					<b-field>
						<b-input placeholder="List name" :value="props.row.name" type="text" icon-right="content-save" icon-right-clickable @icon-right-click="renameList(props.row, $event)" />
					</b-field>
				</b-table-column>
				<b-table-column v-slot="props" width="30" style="cursor: pointer">
					<b-tooltip label="View" position="is-top">
						<b-button size="medium" icon-left="magnify" type="is-text" @click="openList(props.row)" />
					</b-tooltip>
					<!-- <b-tooltip label="Export" position="is-top">
						<b-button size="medium" icon-left="export" type="is-text" @click="exportList(props.row)" />
					</b-tooltip>
					<b-tooltip label="Share" position="is-top">
						<b-button size="medium" icon-left="share" type="is-text" @click="shareList(props.row)" />
					</b-tooltip> -->
					<b-tooltip label="Delete" position="is-top">
						<b-button size="medium" icon-left="delete" type="is-text" @click="deleteList(props.row)" />
					</b-tooltip>
				</b-table-column>
			</b-table>
		</div>
		<div class="has-text-centered button-wrapper">
			<b-button size="is-medium" type="is-text" @click="addNewList">Add new list</b-button>
			<b-button size="is-medium" type="is-text" @click="importFromFile">Import from file</b-button>
			<b-button size="is-medium" type="is-text" @click="importById">Import by ID</b-button>
		</div>
	</div>
</template>

<script lang="ts">
	// Vue basics
	import { Component, Vue, Prop } from "nuxt-property-decorator";
	import { List } from "@/models/List";
	import { loadList } from "@/services/AjaxService";
	@Component({
		components: {},
		name: "lists",
	})
	export default class Lists extends Vue {
		@Prop({ default: false })
		private newList!: boolean;

		private addNewList() {
			this.$buefy.dialog.prompt({
				title: "New list",
				message: "Please enter a name for your list.",
				scroll: "keep",
				inputAttrs: {
					placeholder: "name",
				},
				confirmText: "Save",
				ariaRole: "alertdialog",
				ariaModal: true,
				trapFocus: true,
				onConfirm: (value) => {
					this.addListToCollection(new List().init(value));
				},
			});
		}

		private importById(): void {
			this.$buefy.dialog.prompt({
				title: "Load list by id",
				message: "Paste the id of the list you wish to load into the textfield.",
				confirmText: "Import",
				ariaRole: "alertdialog",
				ariaModal: true,
				trapFocus: true,
				onConfirm: (value) => {
					loadList(value)
						.then((response) => {
							this.addListToCollection(response.data);
						})
						.catch();
				},
			});
		}

		private importFromFile(): void {
			this.$buefy.dialog.prompt({
				message: "Paste the content of the file you wish to import into the textfield.",
				title: "Import list from file",
				onConfirm: (value) => {
					this.addListToCollection(JSON.parse(value) as List);
				},
			});
		}

		private renameList(list: List, event: MouseEvent): void {
			let name = "";
			const target = event.target as HTMLElement;

			if (target.tagName === "I") {
				name = (target.parentElement!.children[0] as HTMLInputElement).value;
			} else {
				name = (target.parentElement!.parentElement!.children[0] as HTMLInputElement).value;
			}

			this.$accessor.renameList({ id: list.id, name });
			this.$accessor.setChanges(true);
			this.$buefy.toast.open({ message: "Name saved!", type: "is-primary" });
		}

		private exportList(): void {}
		private openList(list: List): void {
			this.$accessor.setList(list);
			this.$router.push("characters");
		}

		private shareList(): void {}

		private deleteList(list: List) {
			this.$buefy.dialog.confirm({
				title: "Delete list",
				message: "This will permanently delete your list. Are you sure?",
				scroll: "keep",
				ariaRole: "alertdialog",
				ariaModal: true,
				trapFocus: true,
				confirmText: "Delete",
				onConfirm: () => {
					this.$accessor.removeListFromCollection(list.id);
					this.$accessor.setChanges(true);
				},
			});
		}

		get collection() {
			return this.$accessor.collection;
		}

		private addListToCollection(list: List) {
			this.$accessor.addListToCollection(list);
			this.$accessor.setChanges(true);
		}
	}
</script>

<!--style lang="scss" scoped>
	/deep/.mdi {
		color: #00ffff;
	}
	.text-column {
		padding-top: 0.4rem;
	}
	.wrapper {
		padding-bottom: unset;
		max-width: 99.7vw;
		padding-right: unset;
		padding-left: unset;
	}
	.button-wrapper {
		max-width: 99.7vw;
		padding-right: unset;
		padding-left: unset;
	}
</style-->
