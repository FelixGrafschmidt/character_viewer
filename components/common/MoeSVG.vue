<template>
	<svg
		v-if="name === 'error'"
		class="classes"
		style="overflow: visible; enable-background: new 0 0 32 32"
		viewBox="0 0 32 32"
		xml:space="preserve"
		xmlns="http://www.w3.org/2000/svg"
		xmlns:xlink="http://www.w3.org/1999/xlink"
	>
		<g>
			<g id="Error_1_">
				<g id="Error">
					<circle id="BG" cx="16" cy="16" r="16" style="fill: #d72828" />
					<path id="Exclamatory_x5F_Sign" d="M14.5,25h3v-3h-3V25z M14.5,6v13h3V6H14.5z" style="fill: #e6e6e6" />
				</g>
			</g>
		</g>
	</svg>
</template>

<script lang="ts">
	import { Component, Vue, Prop } from "nuxt-property-decorator";

	@Component({
		components: {},
		name: "MoeSVG",
	})
	export default class MoeSVG extends Vue {
		@Prop({ type: String, default: "" })
		name!: string;

		// @Prop({ type: string, default: null })
		// fill;

		// @Prop({ type: string, default: null })
		// strokeColor;

		// @Prop({ type: number, default: null })
		// strokeWidth;

		// @Prop({ type: string, default: "img" })
		// role;

		// @Prop({ type: string, default: "true" })
		// ariaHidden;

		// @Prop({ type: string, default: "false" })
		// focusable;

		// get styles() {
		// 	let style = "stroke-linecap: round; stroke-linejoin: round;";
		// 	style += this.width ? "width: " + this.width + "rem;" : "";
		// 	style += this.height ? "height: " + this.height + "rem;" : "";
		// 	style += this.fill ? "fill: " + this.fill + "; " : "fill: currentColor; ";
		// 	style +=
		// 		this.strokeColor && this.strokeWidth ? "stroke: " + this.strokeColor + "; stroke-width: " + this.strokeWidth + ";" : "";
		// 	return style;
		// }
	}
</script>
