<template>
	<aside class="dark:bg-gray-700 bg-gray-400 py-4 px-4">
		<h3 v-if="$accessor.list.id" class="text-lg">Characters</h3>
		<template v-if="$accessor.list.id">
			<nuxt-link
				v-for="item of characterItems"
				:key="item.title"
				v-slot="{ navigate, isExactActive }"
				custom
				:to="item.to.name"
			>
				<div
					:class="isExactActive ? 'dark:text-teal-400 text-teal-500 hover:text-teal-300' : ''"
					class="dark-hover:bg-gray-800 hover:bg-gray-500 rounded pl-6 py-1 cursor-pointer"
					role="link"
					@click="navigate"
					@keypress.enter="navigate"
				>
					{{ item.title }}
				</div>
			</nuxt-link>
		</template>
		<h3 class="text-lg caps-small">Lists</h3>
		<nuxt-link
			v-for="item of listItems"
			:key="item.title"
			v-slot="{ navigate, isExactActive }"
			custom
			:to="item.to.name"
		>
			<div
				:class="isExactActive ? 'dark:text-teal-400 text-teal-500 hover:text-teal-300' : ''"
				class="dark-hover:bg-gray-800 hover:bg-gray-500 rounded pl-6 py-1 cursor-pointer"
				role="link"
				@click="navigate"
				@keypress.enter="navigate"
			>
				{{ item.title }}
			</div>
		</nuxt-link>
	</aside>
</template>

<script lang="ts">
	import { Component, Vue } from "nuxt-property-decorator";

	@Component({
		components: {},
		name: "MoeSidebar",
	})
	export default class MoeSidebar extends Vue {
		characterItems: Array<{ title: string; to: { name: string }; icon?: string }> = [
			{
				title: "Characters",
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
	}
</script>
