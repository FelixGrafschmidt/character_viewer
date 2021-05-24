<template>
	<div class="has-tooltip absolute top-[-1rem] left-[-1.5rem] h-full">
		<MoeButton
			icon-class-names="fas fa-arrow-left"
			class="py-1 px-4 rounded-br-sm has-tooltip sticky"
			class-names="text-sm font-medium focus:outline-none"
			color="dark:bg-gray-600 bg-gray-300"
			@click.native="$emit('back')"
		/>
		<span class="tooltip bg-gray-300 dark:bg-gray-600 px-2 ml-2 my-0 rounded w-40 z-30">{{ tooltipText }}</span>
	</div>
</template>

<script lang="ts">
	import { Component, Prop, Vue } from "nuxt-property-decorator";
	@Component({
		components: {},
		name: "MoeBackButton",
	})
	export default class MoeBackButton extends Vue {
		@Prop({ required: true })
		tooltipText!: string;
	}
</script>
