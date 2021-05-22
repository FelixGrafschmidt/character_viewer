<template>
	<footer class="flex dark:bg-gray-800 bg-gray-500 h-12 justify-center items-center relative">
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
			<MoeInfobox v-show="showInfomenu" />
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
