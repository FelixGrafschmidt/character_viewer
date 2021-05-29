<template>
	<MoeTooltip :text="tooltipText" :extra-classes="extraClasses" position="right" class="-mt-4 -ml-6">
		<MoeButtonLight @click.native="$emit('back')" icon="fas fa-arrow-left" class="py-1 px-4 !rounded-none !rounded-br-sm" />
	</MoeTooltip>
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

		@Prop({ default: "mt-2" })
		extraClasses!: string;
	}
</script>
