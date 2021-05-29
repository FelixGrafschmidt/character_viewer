<template>
	<aside @mouseenter="captureScroll" @mouseleave="releaseScroll" class="dark:bg-gray-700 bg-gray-400 py-4 px-4">
		<h3 v-if="$vxm.main.listStore.list.id" class="text-lg max-w-[15rem] whitespace-nowrap truncate">
			<span @click="toList" class="cursor-pointer"> {{ list.name }} </span> |
			<span @click="toGallery" class="cursor-pointer">{{ $t("sidebar.gallery") }}</span>
		</h3>
		<h3 v-else class="text-lg max-w-[15rem] whitespace-nowrap truncate">{{ $t("sidebar.no_list") }}</h3>
		<div
			:class="{
				'scrollbar-thin scrollbar-track-rounded scrollbar-thumb-rounded scrollbar-track-gray-300 scrollbar-thumb-gray-500 dark:scrollbar-track-gray-800 dark:scrollbar-thumb-gray-500 overflow-y-scroll':
					showScrollbars,
			}"
			class="rounded max-h-[40%] min-h-[40%] overflow-hidden"
		>
			<div
				v-for="characteritem of list.characters"
				:key="characteritem.id"
				:class="{ 'bg-teal-500 dark-hover:bg-teal-400 hover:bg-teal-400': character.id && characteritem.id === character.id }"
				@click="navigateToCharacter(characteritem)"
				class="dark-hover:bg-gray-800 hover:bg-gray-500 rounded pl-6 py-1 cursor-pointer"
				role="link"
			>
				{{ characteritem.name }}
			</div>
		</div>
		<h3 @click="toCollection" class="text-lg caps-small cursor-pointer pt-2">{{ $t("sidebar.lists") }}</h3>
		<div
			:class="{
				'scrollbar-thin scrollbar-track-rounded scrollbar-thumb-rounded scrollbar-track-gray-300 scrollbar-thumb-gray-500 dark:scrollbar-track-gray-800 dark:scrollbar-thumb-gray-500 overflow-y-scroll':
					showScrollbars,
			}"
			class="rounded max-h-[40%] min-h-[40%] overflow-hidden"
		>
			<div
				v-for="listitem of collection.lists"
				:key="listitem.id"
				:class="{ 'bg-teal-500 dark-hover:bg-teal-400 hover:bg-teal-400': listitem.id === list.id }"
				@click="navigateToList(listitem)"
				class="dark-hover:bg-gray-800 hover:bg-gray-500 rounded pl-6 py-1 cursor-pointer"
				role="link"
			>
				{{ listitem.name }}
			</div>
		</div>
	</aside>
</template>

<script lang="ts">
	import { Component, Vue } from "nuxt-property-decorator";
	import { Character } from "~/models/interfaces/Character";
	import { List } from "~/models/interfaces/List";

	@Component({
		components: {},
		name: "MoeSidebar",
	})
	export default class MoeSidebar extends Vue {
		showScrollbars = false;

		get character() {
			return this.$vxm.main.characterStore.character;
		}

		get list() {
			return this.$vxm.main.listStore.list;
		}

		get collection() {
			return this.$vxm.main.collectionStore.collection;
		}

		navigateToList(list: List) {
			this.$vxm.main.listStore.setList(list);
			this.$vxm.main.toList(this.$router);
		}

		navigateToCharacter(character: Character) {
			this.$vxm.main.characterStore.setCharacter(character);
			this.$vxm.main.toCharacter(this.$router);
		}

		toList() {
			this.$vxm.main.toList(this.$router);
		}

		toGallery() {
			this.$vxm.main.toGallery(this.$router);
		}

		toCollection() {
			this.$vxm.main.toCollection(this.$router);
		}

		captureScroll() {
			this.showScrollbars = true;
		}

		releaseScroll() {
			this.showScrollbars = false;
		}
	}
</script>
