<template>
	<footer class="flex dark:bg-gray-800 bg-gray-500 h-10 justify-center items-center relative">
		<!-- <div class="col-span-1 row-span-1 flex justify-center items-center">
			<nuxt-link :to="'/imprint'" class="dark-hover:text-blue-300 hover:text-blue-600">Imprint</nuxt-link>
		</div>
		<div class="flex justify-center items-center col-span-1 row-span-1">
			<nuxt-link :to="'/faq'" class="dark-hover:text-blue-300 hover:text-blue-600">FAQ</nuxt-link>
		</div> -->
		<div class="">© Felix Grafschmidt {{ new Date().getFullYear() }}</div>
		<div
			class="absolute right-0 flex flex-col-reverse gap-4 bottom-2 w-[8rem] mr-1"
			@mouseenter="showInfomenu = true"
			@mouseleave="showInfomenu = false"
		>
			<div class="flex gap-2 items-center h-10 mx-auto cursor-pointer justify-center">
				<span :class="showInfomenu ? 'fas fa-angle-down' : 'fas fa-angle-up'"></span>
				<span>Info</span>
			</div>
			<div
				v-show="showInfomenu"
				class="
					border-teal-700
					rounded-t
					border-t border-l border-r
					flex
					gap-2
					items-center
					flex-col
					mr-px
					justify-around
					py-4
					z-10
					w-[8rem]
					dark:bg-gray-800
					bg-gray-500
				"
			>
				<n-link tag="div" to="/imprint" class="cursor-pointer dark:bg-gray-600 bg-gray-400 rounded w-full text-center">
					Imprint
				</n-link>
				<n-link tag="div" to="/faq" class="cursor-pointer dark:bg-gray-600 bg-gray-400 rounded w-full text-center">FAQ</n-link>
			</div>
		</div>
	</footer>
</template>

<script lang="ts">
	import { Component, Vue } from "nuxt-property-decorator";

	@Component({
		components: {},
		name: "MoeFooter",
	})
	export default class MoeFooter extends Vue {
		showInfomenu = false;
	}
</script>
