<template>
	<div>
		<nuxt />
	</div>
</template>

<script lang="ts">
	// Vue basics
	import { Component, Vue } from "nuxt-property-decorator";
	@Component({ name: "mobile" })
	export default class Mobile extends Vue {}
</script>

<style lang="scss">
	@import "@/assets/styles.scss";
	:root {
		--color-primary: #d9ff00;
		--color-secondary: #02fdff;
	}
</style>
