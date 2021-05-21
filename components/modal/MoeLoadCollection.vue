<template>
	<form
		class="
			rounded-2xl
			dark:bg-gray-700
			bg-gray-400
			dark:text-gray-100
			text-gray-900
			flex flex-col
			relative
			m-auto
			pb-10
			sm:pt-5
			items-center
			sm:max-h-[80vh]
			sm:w-[40vw]
		"
		@submit.prevent="id !== '' ? loadCollection() : undefined"
	>
		<label class="mx-12 mt-8">
			<span class="ml-2">Paste collection id below.</span>
			<input
				v-model="id"
				v-autofocus
				type="text"
				class="block rounded-lg border text-gray-900 bg-gray-300 focus:outline-none h-8 mb-8 mt-2 mx-2 sm:w-80"
			/>
		</label>

		<MoeButton text="Load Collection" :class="{ 'cursor-not-allowed': id === '' }" class="m-auto" />
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
	</form>
</template>

<script lang="ts">
	import { Component, Vue } from "nuxt-property-decorator";

	@Component({
		components: {},
		name: "MoeLoadCollection",
	})
	export default class MoeLoadCollection extends Vue {
		id = "";

		loadCollection() {
			window.localStorage.setItem("collectionId", this.id);
			this.$accessor.loadCollection();
			this.$accessor.deactivateModal();
		}
	}
</script>
