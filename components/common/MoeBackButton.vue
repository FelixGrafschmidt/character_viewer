<template>
	<div class="has-tooltip absolute top-[-1rem] left-[-1.5rem]">
		<MoeButtonLight
			@click.native="$emit('back')"
			icon="fas fa-arrow-left"
			class="py-1 px-4 !rounded-none !rounded-br-sm has-tooltip sticky"
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
