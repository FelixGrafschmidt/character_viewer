<template>
	<div>
		<h2 class="text-xl font-bold">{{ $t("pages.index.heading") }}</h2>
		<div class="pb-8">
			<i18n path="pages.index.basic" tag="h3" class="py-2">
				<template #LOCALSTORAGE>
					<a
						class="dark-hover:text-blue-300 hover:text-blue-700 text-blue-500"
						target="_blank"
						href="https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage"
					>
						{{ $t("pages.index.localstorage") }}
					</a>
				</template>
			</i18n>
			<h3 class="py-2">
				{{ $t("pages.index.collection") }}
			</h3>
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
