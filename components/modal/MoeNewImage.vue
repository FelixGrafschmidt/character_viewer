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
			py-10
			h-[80vh]
			w-[40vw]
			items-center
		"
		@click.stop
		@submit.prevent="src !== '' ? addImage() : undefined"
	>
		<img v-if="src" :src="src" alt="new image" class="max-h-[55vh]" @load="valid = true" @error="valid = false" />
		<label class="mx-12">
			<span>Image URL</span>
			<input
				v-autofocus
				:value="src"
				type="text"
				class="block rounded-lg border text-gray-900 bg-gray-300 focus:outline-none h-8 mb-8 w-80"
				@blur="updateUrl"
		/></label>
		<p v-if="!valid" class="text-red-600">Invalid image url</p>
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
		valid: Boolean = true;

		updateUrl(event: Event) {
			const value = (event.target as HTMLInputElement).value;
			if (value.startsWith("data:")) {
				this.valid = false;
				this.src = "";
				this.$forceUpdate();
			} else {
				this.src = value;
				this.valid = false;
			}
		}

		addImage() {
			this.$accessor.addCharacterImage({ src: this.src, valid: this.valid });
			this.$accessor.deactivateModal();
		}
	}
</script>
