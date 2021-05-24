<template>
	<div>
		<div
			v-for="list in collection.lists"
			:key="list.id"
			class="flex h-24 items-center rounded cursor-pointer my-1"
			:class="{
				'bg-teal-500 hover:bg-teal-400': list.id === $vxm.main.listStore.list.id,
				'hover:bg-gray-500 dark-hover:bg-gray-700': list.id !== $vxm.main.listStore.list.id,
				'bg-gray-300 dark:bg-gray-800': list.id !== $vxm.main.listStore.list.id,
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
				<MoeButton
					:text="$t('list.export')"
					class="w-18 px-1"
					color="dark:bg-gray-600 bg-gray-400 m-1"
					@click.stop.native="exportList(list)"
				/>
				<MoeButton
					:text="$t('list.delete')"
					class="w-18 px-1"
					color="dark:bg-gray-600 bg-gray-400 m-1"
					@click.stop.native="deleteList(list)"
				/>
				<MoeButton
					:text="$t('list.copy')"
					class="w-18 px-1"
					color="dark:bg-gray-600 bg-gray-400 m-1"
					@click.stop.native="copyList(list)"
				/>
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
			return this.$vxm.main.collectionStore.collection;
		}

		deleteList(list: List) {
			this.$vxm.main.setModal(Modal.DELETELIST);
			this.$vxm.main.collectionStore.setListToDelete(list);
		}

		exportList(list: List) {
			saveAs(new File([JSON.stringify(list)], list.name + ".json"));
		}

		openList(list: List) {
			this.$vxm.main.listStore.setList(list);
			this.$router.push(this.$vxm.main.navigationPaths.list);
		}

		addListToCollection(list: List) {
			this.$vxm.main.collectionStore.addListToCollection(list);
		}

		updateListname(id: string, event: InputEvent) {
			const name = (event.target as HTMLInputElement).value;
			this.$vxm.main.collectionStore.renameList({ name, id });
		}

		copyList(list: List) {
			navigator.clipboard.writeText(JSON.stringify(list));
		}
	}
</script>
