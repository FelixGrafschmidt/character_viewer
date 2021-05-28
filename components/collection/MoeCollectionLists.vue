<template>
	<div>
		<div
			v-for="(list, index) in collection.lists"
			:ref="list.id"
			:key="list.id"
			:class="{
				'hover:bg-gray-500 dark-hover:bg-gray-600': list.id !== $vxm.main.listStore.list.id,
				'bg-gray-300 dark:bg-gray-800': index % 2 !== 0,
				'bg-gray-400 dark:bg-gray-700': index % 2 === 0,
				'!bg-teal-500 dark:!bg-teal-500  dark-hover:!bg-teal-400  hover:bg-teal-400': list.id === $vxm.main.listStore.list.id,
			}"
			@click="openList(list)"
			class="flex h-24 items-center rounded cursor-pointer my-1"
		>
			<div class="w-2/5 text-center">{{ list.id }}</div>
			<form class="w-2/5 text-center relative">
				<input
					:value="list.name"
					@click.stop
					@input="updateListname(list.id, $event)"
					type="text"
					class="rounded-lg border text-gray-900 bg-gray-300 focus:outline-none w-full"
				/>
			</form>
			<div class="w-1/6 text-center">{{ $tc("list.entry_s", list.characters.length) }}</div>
			<div class="w-1/6 text-center flex gap-2 justify-center">
				<!-- <MoeButton :text="'Share'" class="w-16" color="dark:bg-gray-600 bg-gray-400 m-1" /> -->
				<MoeButtonDark @click.stop.native="exportList(list)" class="w-18 px-1" icon="fas fa-file-export" />
				<MoeButtonDark @click.stop.native="deleteList(list)" class="w-18 px-1" icon="fas fa-trash" />
				<MoeButtonDark @click.stop.native="copyList(list)" class="w-18 px-1" icon="fas fa-copy" />
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

		get scrollID() {
			return this.$vxm.main.scrollID;
		}

		mounted() {
			if (this.scrollID && this.$refs[this.scrollID]) {
				const element = this.$refs[this.scrollID] as Element[];
				element[0].scrollIntoView({ behavior: "auto", block: "start", inline: "start" });
			}
			this.$vxm.main.setScrollID("");
		}

		deleteList(list: List) {
			this.$vxm.main.setModal(Modal.DELETELIST);
			this.$vxm.main.collectionStore.setListToDelete(list);
		}

		exportList(list: List) {
			saveAs(new File([JSON.stringify(list)], list.name + ".json"));
		}

		openList(list: List) {
			this.$vxm.main.setScrollID(list.id);
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
