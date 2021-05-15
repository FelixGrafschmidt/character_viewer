<template>
	<aside class="dark:bg-gray-700 bg-gray-400 py-4 px-4" @mouseenter="captureScroll" @mouseleave="releaseScroll">
		<h3 v-if="$accessor.list.id" class="text-lg max-w-[15rem] whitespace-nowrap truncate">
			<span class="cursor-pointer" @click="$router.push($accessor.navigationPaths.list)"> {{ list.name }} </span> |
			<span class="cursor-pointer" @click="$router.push($accessor.navigationPaths.gallery)">Gallery</span>
		</h3>
		<h3 v-else class="text-lg max-w-[15rem] whitespace-nowrap truncate">No list selected</h3>
		<div
			:class="{
				'scrollbar scrollbar-thin scrollbar-track-gray-300 scrollbar-thumb-gray-500 dark:scrollbar-track-gray-800 dark:scrollbar-thumb-gray-500 ':
					showScrollbars,
			}"
			class="rounded max-h-[40%] min-h-[40%] overflow-y-scroll overflow-hidden"
		>
			<div
				v-for="characteritem of list.characters"
				:key="characteritem.id"
				class="dark-hover:bg-gray-800 hover:bg-gray-500 rounded pl-6 py-1 cursor-pointer"
				:class="{ 'dark:text-green-300': character.id && characteritem.id === character.id }"
				role="link"
				@click="navigateToCharacter(characteritem)"
			>
				{{ characteritem.name }}
			</div>
		</div>
		<h3 class="text-lg caps-small cursor-pointer pt-2" @click="$router.push('/lists')">Lists</h3>
		<div
			:class="{
				'scrollbar scrollbar-thin scrollbar-track-gray-300 scrollbar-thumb-gray-500 dark:scrollbar-track-gray-800 dark:scrollbar-thumb-gray-500 ':
					showScrollbars,
			}"
			class="rounded max-h-[40%] min-h-[40%] overflow-y-scroll overflow-hidden"
		>
			<div
				v-for="listitem of collection.lists"
				:key="listitem.id"
				class="dark-hover:bg-gray-800 hover:bg-gray-500 rounded pl-6 py-1 cursor-pointer"
				:class="{ 'dark:text-green-300': listitem.id === list.id }"
				role="link"
				@click="navigateToList(listitem)"
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
			return this.$accessor.character;
		}

		get list() {
			return this.$accessor.list;
		}

		get collection() {
			return this.$accessor.collection;
		}

		navigateToList(list: List) {
			this.$accessor.resetCharacter();
			this.$accessor.setList(list);
			this.$router.push(this.$accessor.navigationPaths.list);
		}

		navigateToCharacter(character: Character) {
			this.$accessor.setCharacter(character);
			this.$router.push(this.$accessor.navigationPaths.character);
		}

		captureScroll() {
			window.document.body.style.position = "sticky";
			window.document.body.style.overflow = "hidden";
			this.showScrollbars = true;
		}

		releaseScroll() {
			window.document.body.style.position = "static";
			window.document.body.style.overflow = "overlay";
			this.showScrollbars = false;
		}
	}
</script>
