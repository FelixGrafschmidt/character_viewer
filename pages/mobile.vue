<template>
	<div class="pb-4">
		<MoeMobileHeader />
		<MoeMobileContent />
	</div>
</template>

<script lang="ts">
	// Vue basics
	import { Component, Vue } from "nuxt-property-decorator";

	@Component({
		name: "mobile",
		layout: "mobile",
	})
	export default class Mobile extends Vue {}
</script>
