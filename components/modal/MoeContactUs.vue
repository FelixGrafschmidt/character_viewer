<template>
	<div class="rounded-2xl dark:bg-gray-700 bg-gray-400 dark:text-gray-100 text-gray-900 grid relative m-auto pb-10">
		<div class="text-3xl pt-8 self-center text-center">Contact us</div>
		<div class="mt-12 px-16">
			Feel free to
			<a
				class="dark-hover:text-blue-300 hover:text-blue-700 text-blue-500"
				target="_blank"
				href="https://github.com/Ithambar/character_viewer/issues/new"
				>raise an issue</a
			>
			on our Github page or
			<a
				class="dark-hover:text-blue-300 hover:text-blue-700 text-blue-500"
				target="_blank"
				href="https://github.com/Ithambar/character_viewer/issues"
				>add more info</a
			>
			to an existing issue.
			<br />
			You can also
			<a
				class="dark-hover:text-blue-300 hover:text-blue-700 text-blue-500"
				target="_blank"
				href="mailto:ithambar.lethenain@gmail.com?subject=Issue%20on%20character%20manager%20webpage"
				>send us an eMail</a
			>.
		</div>
		<div
			class="
				top-1
				right-1
				dark:bg-red-500
				dark:text-gray-900
				bg-red-800
				text-gray-100
				h-6
				w-6
				text-center
				rounded-2xl
				ml-24
				cursor-pointer
				absolute
			"
			@click="$accessor.deactivateModal()"
		>
			X
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
