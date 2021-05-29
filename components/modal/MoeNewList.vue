<template>
	<form
		@click.stop
		@submit.prevent="name !== '' ? addList() : undefined"
		class="
			rounded-2xl
			dark:bg-gray-800
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
	>
		<label class="mx-12">
			<span>{{ $t("modals.new_list.title") }}</span>
			<input
				v-model="name"
				v-autofocus
				type="text"
				class="block rounded-lg border text-gray-900 bg-gray-300 focus:outline-none mb-8 w-80"
			/>
		</label>
		<MoeButtonDark :class="{ 'cursor-not-allowed': name === '' }" class="m-auto"> {{ $t("modals.new_list.add") }} </MoeButtonDark>
		<div
			@click="$vxm.main.deactivateModal()"
			class="
				items-center
				justify-center
				top-1
				right-1
				flex
				dark:bg-red-500
				dark:text-gray-900
				bg-red-800
				text-gray-100
				h-6
				w-6
				rounded-2xl
				cursor-pointer
				absolute
			"
		>
			<div class="fas fa-times"></div>
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
			this.$vxm.main.toList(this.$router);
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
