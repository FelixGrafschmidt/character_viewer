<template>
	<button :class="`${classNames} ${color}`">
		{{ text }}
		<i v-if="iconClassNames !== ''" :class="iconClassNames"></i>
	</button>
</template>

<script lang="ts">
	// Vue basics
	import { Component, Prop, Vue } from "nuxt-property-decorator";
	@Component({ name: "MoeButton" })
	export default class MoeButton extends Vue {
		@Prop({ default: "px-3 py-2 rounded-md text-sm font-medium focus:outline-none" })
		classNames!: string;

		@Prop({ default: "dark:bg-gray-900 bg-gray-600" })
		color!: string;

		@Prop({ default: "" })
		iconClassNames!: string;

		@Prop({ default: "" })
		text!: string;
	}
</script>
<style lang="postcss"></style>
