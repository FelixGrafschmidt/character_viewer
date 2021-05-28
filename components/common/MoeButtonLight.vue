<template>
	<button
		class="
			px-3
			py-2
			rounded-md
			text-sm
			font-medium
			focus:outline-none
			bg-gray-400
			dark:bg-gray-600
			hover:bg-gray-500
			dark-hover:bg-gray-700
			hover:text-teal-500
		"
	>
		<i v-if="icon !== ''" :class="icon"></i>
		<slot />
	</button>
</template>

<script lang="ts">
	// Vue basics
	import { Component, Prop, Vue } from "nuxt-property-decorator";
	@Component({ name: "MoeButtonLight" })
	export default class MoeButtonLight extends Vue {
		@Prop({ default: "" })
		icon!: string;
	}
</script>
<style lang="postcss"></style>
