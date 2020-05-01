<template>
	<b-navbar-item :tag="tag">
		{{ text }}
	</b-navbar-item>
</template>

<script lang="ts">
	// Vue basics
	import { Vue, Component, Prop } from "nuxt-property-decorator";
	@Component({
		components: {},
	})
	export default class App extends Vue {
		@Prop({ required: true, default: "", type: String })
		text!: String;

		@Prop({ required: false, default: "a", type: String })
		tag!: String;
	}
</script>

<style lang="scss" scoped></style>
