<template>
	<div v-if="initialVisit" class="my-20">
		<h2 class="text-xl font-bold">{{ $t("pages.index.heading") }}</h2>
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
		<i18n path="pages.index.start" tag="h3" class="py-2">
			<template #NEWLIST>
				<nuxt-link class="dark-hover:text-blue-300 hover:text-blue-700 text-blue-500" :to="$vxm.main.navigationPaths.collection">
					{{ $t("pages.index.list") }}
				</nuxt-link>
			</template>
		</i18n>
	</div>
	<div v-else class="my-20">
		<h2 class="text-xl font-bold">{{ $t("pages.index.returning") }}</h2>
	</div>
</template>

<script lang="ts">
	import { Component, Vue } from "nuxt-property-decorator";

	@Component({
		components: {},
		name: "index",
		middleware: ["resetCharacter"],
	})
	export default class Index extends Vue {
		initialVisit: boolean = false;

		mounted() {
			if (this.$vxm.main.collectionStore.collection.lists.length === 0) {
				this.initialVisit = true;
			}
		}
	}
</script>
