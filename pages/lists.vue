<template>
	<div>
		<div class="columns section wrapper">
			<b-table ref="table" class="column is-half is-offset-3" :data="collection">
				<!-- <template slot-scope="props"> -->
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
				<b-table-column v-slot="props" width="30">
					<b-tooltip label="View" position="is-top">
						<b-button size="medium" icon-left="magnify" type="is-text" @click="openList(props.row)" />
					</b-tooltip>
					<!-- <b-tooltip label="Export" position="is-top" >
							<b-button @click="exportList(props.row)" size="medium" icon-left="export" type="is-text" />
						</b-tooltip>
						<b-tooltip label="Share" position="is-top" >
							<b-button @click="shareList(props.row)" size="medium" icon-left="share" type="is-text" />
						</b-tooltip> -->
					<b-tooltip label="Delete" position="is-top">
						<b-button size="medium" icon-left="delete" type="is-text" @click="deleteList(props.row)" />
					</b-tooltip>
				</b-table-column>
				<!-- </template> -->
			</b-table>
		</div>
		<div class="columns button-wrapper">
			<b-tooltip class="column is-offset-3 is-2" label="Add new" position="is-bottom">
				<b-button expanded size="is-large" icon-left="plus-circle-outline" type="is-text" @click="addNewList" />
			</b-tooltip>
			<b-tooltip class="column is-2" label="Import from file" position="is-bottom">
				<b-button expanded size="is-large" icon-left="import" type="is-text" @click="importFromFile" />
			</b-tooltip>
			<b-tooltip class="column is-2" label="Import by id" position="is-bottom">
				<b-button expanded size="is-large" icon-left="import" type="is-text" @click="importById" />
			</b-tooltip>
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
					this.$accessor.addListToCollection(new List(value, []));
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
							this.$accessor.addListToCollection(response.data);
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
					this.$accessor.addListToCollection(JSON.parse(value) as List);
				},
			});
		}

		private renameList(list: List, event: MouseEvent): void {
			let name = "";
			const target = event.target as HTMLElement;
			if (target.tagName === "i") {
				name = (target.parentElement!.children[0] as HTMLInputElement).value;
			} else {
				name = (target.parentElement!.parentElement!.children[0] as HTMLInputElement).value;
			}

			this.$accessor.renameList({ id: list.id, name });
			this.$buefy.toast.open({ message: "Name saved!" });
		}

		private exportList(): void {}
		private openList(list: List): void {
			this.$emit("open-list", list);
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
				},
			});
		}

		get collection() {
			return this.$accessor.collection;
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
