<template>
	<div>
		<h2 class="text-xl font-bold pt-8">{{ $t("tutorial.important") }}</h2>
		<div class="pb-8">
			{{ $t("tutorial.saving") }}
		</div>
	</div>
</template>

<script lang="ts">
	import { Component, Vue } from "nuxt-property-decorator";

	@Component({
		components: {},
		name: "MoeTutorial1",
	})
	export default class MoeTutorial1 extends Vue {}
</script>
