<template>
	<footer class="flex dark:bg-gray-800 bg-gray-500 h-10 justify-center items-center relative">
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
					border-teal-700 border-t border-l border-r
					flex
					items-center
					flex-col
					mr-px
					justify-around
					z-10
					w-[8rem]
					dark:bg-gray-800
					bg-gray-500
				"
			>
				<nuxt-link v-slot="{ navigate }" tag="h2" custom to="/imprint">
					<div
						class="border-b border-teal-700 cursor-pointer w-full text-center py-2"
						role="link"
						@click="navigate"
						@keypress.enter="navigate"
					>
						Imprint
					</div>
				</nuxt-link>
				<nuxt-link v-slot="{ navigate }" tag="h2" custom to="/faq">
					<div class="cursor-pointer w-full text-center py-2" role="link" @click="navigate" @keypress.enter="navigate">FAQ</div>
				</nuxt-link>
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
