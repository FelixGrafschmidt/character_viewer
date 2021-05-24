<template>
	<div class="rounded-2xl dark:bg-gray-700 bg-gray-400 dark:text-gray-100 text-gray-900 grid relative m-auto pb-10" @click.stop>
		<div class="text-3xl pt-8 self-center text-center">{{ $t("modals.contact_us.title") }}</div>
		<div class="mt-12 px-16">
			<i18n path="modals.contact_us.github">
				<template #RAISEISSUE>
					<a
						class="dark-hover:text-blue-300 hover:text-blue-700 text-blue-500"
						target="_blank"
						href="https://github.com/Ithambar/character_viewer/issues/new"
						>{{ $t("modals.contact_us.raise_issue") }}</a
					>
				</template>
				<template #ADDINFO>
					<a
						class="dark-hover:text-blue-300 hover:text-blue-700 text-blue-500"
						target="_blank"
						href="https://github.com/Ithambar/character_viewer/issues"
						>{{ $t("modals.contact_us.add_info") }}</a
					>
				</template>
			</i18n>
			<br />
			<i18n path="modals.contact_us.mail">
				<template #MAILTO>
					<a
						class="dark-hover:text-blue-300 hover:text-blue-700 text-blue-500"
						target="_blank"
						href="mailto:ithambar.lethenain@gmail.com?subject=Issue%20on%20character%20manager%20webpage"
						>{{ $t("modals.contact_us.mailto") }}</a
					>
				</template>
			</i18n>
		</div>
		<div
			class="
				items-center
				justify-center
				top-1
				right-1
				flex
				dark:bg-red-500
				dark:text-gray-900
				bg-red-800
				text-gray-100
				h-6
				w-6
				rounded-2xl
				cursor-pointer
				absolute
			"
			@click="$vxm.main.deactivateModal()"
		>
			<div class="fas fa-times"></div>
		</div>
	</div>
</template>

<script lang="ts">
	import { Component, Vue } from "nuxt-property-decorator";

	@Component({
		components: {},
		name: "MoeContactUs",
	})
	export default class MoeContactUs extends Vue {}
</script>
