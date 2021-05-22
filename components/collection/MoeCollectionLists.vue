<template>
	<div>
		<div
			v-for="(list, index) in collection.lists"
			:key="list.id"
			class="flex h-24 items-center rounded cursor-pointer"
			:class="{
				'bg-teal-500 hover:bg-teal-400': list.id === $accessor.list.id,
				'hover:bg-gray-500  dark-hover:bg-gray-700': list.id !== $accessor.list.id,
				'bg-gray-300  dark:bg-gray-800': list.id !== $accessor.list.id && index % 2 === 0,
				'bg-gray-300  dark:bg-gray-800': list.id !== $accessor.list.id && index % 2 !== 0,
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
				<!-- <MoeButton :text="'Share'" class="w-16" color="dark:bg-gray-600 bg-gray-400 m-1" /> -->
				<MoeButton :text="'Export'" class="w-16" color="dark:bg-gray-600 bg-gray-400 m-1" @click.stop.native="exportList(list)" />
				<MoeButton :text="'Delete'" class="w-16" color="dark:bg-gray-600 bg-gray-400 m-1" @click.stop.native="deleteList(list)" />
				<MoeButton :text="'Copy'" class="w-16" color="dark:bg-gray-600 bg-gray-400 m-1" @click.stop.native="copyList(list)" />
			</div>
		</div>
	</div>
</template>

<script lang="ts">
	import { Component, Vue } from "nuxt-property-decorator";
	import { saveAs } from "file-saver";
	import { Modal } from "~/models/enums/Modal";
	import { List, newList } from "~/models/interfaces/List";

	@Component({
		components: {},
		name: "MoeCollectionLists",
	})
	export default class MoeCollectionLists extends Vue {
		newList: boolean = false;

		listToDelete: List = newList();

		get collection() {
			return this.$accessor.collection;
		}

		deleteList(list: List) {
			window.document.body.style.overflow = "hidden";
			this.$accessor.setModal(Modal.DELETELIST);
			this.$accessor.setListToDelete(list);
		}

		exportList(list: List): void {
			saveAs(new File([JSON.stringify(list)], list.name + ".json"));
		}

		openList(list: List): void {
			this.$accessor.setList(list);
			this.$router.push(this.$accessor.navigationPaths.list);
		}

		addListToCollection(list: List) {
			this.$accessor.addListToCollection(list);
		}

		updateListname(id: string, event: InputEvent) {
			const name = (event.target as HTMLInputElement).value;
			this.$accessor.renameList({ name, id });
		}

		copyList(list: List) {
			navigator.clipboard.writeText(JSON.stringify(list));
		}
	}
</script>
