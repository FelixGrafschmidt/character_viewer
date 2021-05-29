<template>
	<div
		:class="{
			'flex-row': position === 'right',
			'flex-row-reverse': position === 'left',
			'flex-col-reverse': position === 'top',
			'flex-col': position === 'bottom',
		}"
		class="has-tooltip relative flex items-center h-full"
	>
		<slot />
		<span
			:class="extraClassesCombined"
			class="
				tooltip
				absolute
				border border-gray-500
				z-30
				bg-gray-300
				text-gray-800
				rounded
				w-max
				max-w-[8rem]
				text-center
				mx-auto
				p-1
			"
		>
			{{ text }}
		</span>
	</div>
</template>

<script lang="ts">
	// Vue basics
	import { Component, Prop, Vue } from "nuxt-property-decorator";
	@Component({ name: "MoeTooltip" })
	export default class MoeTooltip extends Vue {
		@Prop({ default: "" })
		text!: string;

		@Prop({ default: "bottom" })
		position!: string;

		@Prop({ default: "" })
		extraClasses!: string;

		get extraClassesCombined() {
			switch (this.position) {
				case "bottom":
					return this.extraClasses + " mt-10";
				case "top":
					return this.extraClasses + " mb-10";
				case "right":
					return this.extraClasses + " ml-10";
				case "left":
					return this.extraClasses + " mr-10";
				default:
					return this.extraClasses;
			}
		}
	}
</script>

<style lang="postcss" scoped>
	.tooltip {
		@apply invisible;
	}

	.has-tooltip:hover .tooltip {
		@apply visible;
	}
</style>
