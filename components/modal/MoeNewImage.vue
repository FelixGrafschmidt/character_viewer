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
			z-20
			max-h-[80vh]
			w-[40vw]
			items-center
		"
		@submit.prevent="src !== '' ? addImage() : undefined"
	>
		<img :src="src" alt="" class="m-8 max-h-[55vh]" />
		<label class="mx-12">
			<span>Image URL</span>
			<input
				v-model="src"
				v-autofocus
				type="text"
				class="block rounded-lg border text-gray-900 bg-gray-300 focus:outline-none h-8 mb-8 w-80"
		/></label>
		<MoeButton text="Add Image" :class="{ 'cursor-not-allowed': src === '' }" class="m-auto" />
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
		name: "MoeNewImage",
	})
	export default class MoeNewImage extends Vue {
		src = "";

		addImage() {
			this.$accessor.addCharacterImage(this.src);
			this.$accessor.deactivateModal();
		}
	}
</script>
