<template>
	<div v-if="newList" class="my-20">
		<h2 class="text-xl font-bold">New List</h2>
		<div class="pt-8">
			<label for="name">
				<p class="block text-sm font-medium">Type a name for your list</p>
			</label>
			<form class="relative w-1/4" @submit.prevent="addNewList">
				<input
					id="name"
					v-model="newListName"
					v-autofocus
					type="text"
					class="block rounded-lg border text-gray-900 bg-gray-300 focus:outline-none h-8 w-full"
					placeholder="name"
				/>
				<div class="absolute inset-y-0 right-0 flex items-center">
					<MoeButton
						v-if="newListName !== ''"
						:text="'Save'"
						class-names="w-16 h-full px-3 rounded-md text-sm font-medium focus:outline-none rounded-l-none"
						color="dark:bg-gray-600 bg-gray-400"
					>
					</MoeButton>
					<MoeButton
						v-else
						:text="'Save'"
						disabled
						class-names="w-16 cursor-not-allowed h-full px-3 rounded-md text-sm font-medium focus:outline-none rounded-l-none"
						color="dark:bg-gray-600 bg-gray-400"
					>
					</MoeButton>
				</div>
			</form>
			<div v-if="collection.lists.length > 0">
				<MoeButton
					class-names="w-16 h-full px-3 rounded-md text-sm font-medium focus:outline-none mt-2"
					color="dark:bg-gray-600 bg-gray-400"
					:text="'Back'"
					@click.native="newList = false"
				></MoeButton>
			</div>
		</div>
	</div>
	<div v-else class="mt-12 grid">
		<div class="flex mb-2 sticky top-16 dark:bg-gray-600 bg-gray-400 z-[3] rounded font-extrabold text-lg">
			<div class="py-2 w-2/5 dark:border-gray-800 border-r-2 text-center">ID</div>
			<div class="py-2 w-2/5 dark:border-gray-800 border-r-2 border-l-2 text-center">Name</div>
			<div class="py-2 w-1/6 dark:border-gray-800 border-r-2 border-l-2 text-center">Content</div>
			<div class="py-2 w-1/6 dark:border-gray-800 border-l-2"></div>
		</div>
		<div class="">
			<div
				v-for="(list, index) in collection.lists"
				:key="list.id"
				class="flex h-24 hover:bg-gray-500 dark-hover:bg-gray-700 items-center rounded cursor-pointer"
				:class="{
					'bg-gray-300  dark:bg-gray-800': index % 2 === 0,
					'border-4 dark:border-teal-300 border-teal-600': list.id === $accessor.list.id,
				}"
				@click="openList(list)"
			>
				<div class="w-2/5 text-center">{{ list.id }}</div>
				<form class="w-2/5 text-center relative">
					<input
						:value="list.name"
						type="text"
						class="rounded-lg border text-gray-900 bg-gray-300 focus:outline-none w-full"
						@click.stop
						@input="updateListname(list.id, $event)"
					/>
				</form>
				<div class="w-1/6 text-center">{{ list.characters.length }} {{ list.characters.length === 1 ? "Entry" : "Entries" }}</div>
				<div class="w-1/6 text-center">
					<MoeButton :text="'Share'" class="w-16" color="dark:bg-gray-600 bg-gray-400 m-1" />
					<MoeButton
						:text="'Export'"
						class="w-16"
						color="dark:bg-gray-600 bg-gray-400 m-1"
						@click.stop.native="exportList(list)"
					/>
					<MoeButton
						:text="'Delete'"
						class="w-16"
						color="dark:bg-gray-600 bg-gray-400 m-1"
						@click.stop.native="deleteList(list)"
					/>
					<MoeButton :text="'Copy'" class="w-16" color="dark:bg-gray-600 bg-gray-400 m-1" @click.stop.native="copyList(list)" />
				</div>
			</div>
		</div>
		<div class="flex mt-7 justify-center mb-20">
			<MoeButton :text="'Create New List'" class="w-64 mr-2" color="dark:bg-gray-600 bg-gray-400" @click.native="newList = true" />
			<MoeButton :text="'Import List'" class="w-64" color="dark:bg-gray-600 bg-gray-400" @click.native="importFromFile" />
		</div>
	</div>
</template>

<script lang="ts">
	// Vue basics
	import { Component, Vue } from "nuxt-property-decorator";
	import { List, newList } from "@/models/interfaces/List";
	import { saveAs } from "file-saver";
	import { Modal } from "~/models/enums/Modal";
	@Component({
		components: {},
		name: "collection",
		middleware: ["resetCharacter"],
	})
	export default class Collection extends Vue {
		newListName: string = "";

		newList: boolean = false;

		listToDelete: List = newList();

		async mounted() {
			const url = new URL(window.location.href);
			const path = url.pathname.split("/");
			const collectionid = path[1];
			if (!collectionid.match(/\b[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}\b/)) {
				this.$router.push(this.$accessor.navigationPaths.collection);
			}
			const oldId = window.localStorage.getItem("collectionId");
			window.localStorage.setItem("collectionId", collectionid);
			await this.$accessor.loadCollection();
			if (this.$accessor.collection.lists.length === 0 && oldId) {
				window.localStorage.setItem("collectionId", oldId);
			}
			await this.$accessor.loadCollection();
			this.newList = this.collection.lists.length === 0;
		}

		deleteList(list: List) {
			window.document.body.style.overflow = "hidden";
			this.$accessor.setModal(Modal.DELETELIST);
			this.$accessor.setListToDelete(list);
		}

		addNewList() {
			this.addListToCollection(newList(undefined, this.newListName));
			this.newListName = "";
			if (this.collection.lists.length === 1) {
				this.openList(this.collection.lists[0]);
			} else {
				this.newList = false;
			}
		}

		exportList(list: List): void {
			saveAs(new File([JSON.stringify(list)], list.name + ".json"));
		}

		openList(list: List): void {
			this.$accessor.setList(list);
			this.$router.push(this.$accessor.navigationPaths.list);
		}

		get collection() {
			return this.$accessor.collection;
		}

		addListToCollection(list: List) {
			this.$accessor.addListToCollection(list);
		}

		updateListname(id: string, event: InputEvent) {
			const name = (event.target as HTMLInputElement).value;
			this.$accessor.renameList({ name, id });
		}

		importFromFile(): void {
			window.document.body.style.overflow = "hidden";
			this.$accessor.setModal(Modal.IMPORTLIST);
		}

		copyList(list: List) {
			// this.copyText = "Copied!";
			// window.setTimeout(() => {
			// 	this.copyText = "Copy ID";
			// }, 1000 * 2);
			navigator.clipboard.writeText(JSON.stringify(list));
		}
	}
</script>
