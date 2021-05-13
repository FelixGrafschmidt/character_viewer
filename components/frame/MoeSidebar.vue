<template>
	<aside class="dark:bg-gray-700 bg-gray-400 py-4 px-4">
		<h3 v-if="$accessor.list.id" class="text-lg max-w-[11rem] whitespace-nowrap truncate">{{ `Characters (${list.name})` }}</h3>
		<template v-if="$accessor.list.id">
			<nuxt-link v-for="item of characterItems" :key="item.title" v-slot="{ navigate, isExactActive }" custom :to="item.to.name">
				<div
					:class="isExactActive ? 'dark:text-green-400 text-green-500 hover:text-green-300' : ''"
					class="dark-hover:bg-gray-800 hover:bg-gray-500 rounded pl-6 py-1 cursor-pointer"
					role="link"
					@click="navigate"
					@keypress.enter="navigate"
				>
					{{ item.title }}
				</div>
			</nuxt-link>
		</template>
		<h3 class="text-lg caps-small cursor-pointer" @click="$router.push('lists')">Lists</h3>
		<!-- <div v-for="list of collection.lists" :key="list.id" v-slot="{ isExactActive }"> -->
		<div
			v-for="list of collection.lists"
			:key="list.id"
			class="dark-hover:bg-gray-800 hover:bg-gray-500 rounded pl-6 py-1 cursor-pointer"
			role="link"
			@click="navigateToList(list)"
		>
			{{ list.name }}
		</div>
		<!-- </div> -->
	</aside>
</template>

<script lang="ts">
	import { Component, Vue } from "nuxt-property-decorator";
	import { List } from "~/models/interfaces/List";

	@Component({
		components: {},
		name: "MoeSidebar",
	})
	export default class MoeSidebar extends Vue {
		get list() {
			return this.$accessor.list;
		}

		get collection() {
			return this.$accessor.collection;
		}

		characterItems: Array<{ title: string; to: { name: string }; icon?: string }> = [
			{
				title: `Characters`,
				to: { name: "characters" },
			},
			{
				title: "Gallery",
				to: { name: "gallery" },
			},
		];

		listItems: Array<{ title: string; to: { name: string }; icon?: string }> = [
			{
				title: "List-Manager",
				to: { name: "lists" },
			},
		];

		navigateToList(list: List) {
			this.$accessor.setList(list);
			this.$router.push("characters");
		}
	}
</script>
