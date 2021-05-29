<template>
	<div>
		<h2 class="text-xl font-bold">{{ $t("tutorial.important") }}</h2>
		<div class="pb-8">
			{{ $t("tutorial.saving") }}
		</div>
	</div>
</template>

<script lang="ts">
	import { Component, Vue } from "nuxt-property-decorator";

	@Component({
		components: {},
		name: "MoeTutorial2",
	})
	export default class MoeTutorial2 extends Vue {}
</script>
