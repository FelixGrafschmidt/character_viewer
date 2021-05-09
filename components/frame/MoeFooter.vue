<template>
	<footer class="grid grid-cols-2 grid-rows-2 dark:bg-gray-800 bg-gray-500 h-20">
		<div class="col-span-1 row-span-1 flex justify-center items-center">
			<nuxt-link :to="'imprint'" class="dark-hover:text-blue-300 hover:text-blue-600">Imprint</nuxt-link>
		</div>
		<div class="flex justify-center items-center col-span-1 row-span-1">
			<nuxt-link :to="'faq'" class="dark-hover:text-blue-300 hover:text-blue-600">FAQ</nuxt-link>
		</div>
		<div class="flex justify-center items-center pb-4 col-span-2 row-span-1">
			© Felix Grafschmidt {{ new Date().getFullYear() }}
		</div>
	</footer>
</template>

<script lang="ts">
	import { Component, Vue } from "nuxt-property-decorator";

	@Component({
		components: {},
		name: "MoeFooter",
	})
	export default class MoeFooter extends Vue {}
</script>
