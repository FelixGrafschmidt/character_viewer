<template>
	<form
		class="
			rounded-2xl
			dark:bg-gray-700
			bg-gray-400
			dark:text-gray-100
			text-gray-900
			flex flex-col
			relative
			m-auto
			pb-10
			pt-5
			max-h-[80vh]
			w-[40vw]
			items-center
		"
		@click.stop
		@submit.prevent="name !== '' ? addList() : undefined"
	>
		<label class="mx-12">
			<span>Type a name for your new list.</span>
			<input
				v-model="name"
				v-autofocus
				type="text"
				class="block rounded-lg border text-gray-900 bg-gray-300 focus:outline-none mb-8 w-80"
			/>
		</label>
		<MoeButton text="Add List" :class="{ 'cursor-not-allowed': name === '' }" class="m-auto" />
		<div
			class="
				top-1
				right-1
				dark:bg-red-500
				dark:text-gray-900
				bg-red-800
				text-gray-100
				h-6
				w-6
				text-center
				rounded-2xl
				ml-24
				cursor-pointer
				absolute
			"
			@click="$vxm.main.deactivateModal()"
		>
			X
		</div>
	</form>
</template>

<script lang="ts">
	import { Component, Vue } from "nuxt-property-decorator";
	import { List, newList } from "@/models/interfaces/List";
	@Component({
		components: {},
		name: "MoeNewList",
	})
	export default class MoeNewList extends Vue {
		name: string = "";

		get collection() {
			return this.$vxm.main.collectionStore.collection;
		}

		openList(list: List) {
			this.$vxm.main.listStore.setList(list);
			this.$router.push(this.$vxm.main.navigationPaths.list);
		}

		addList() {
			this.$vxm.main.collectionStore.addListToCollection(newList(undefined, this.name));
			if (this.collection.lists.length === 1) {
				this.openList(this.collection.lists[0]);
			} else {
				this.$vxm.main.deactivateModal();
			}
		}
	}
</script>
