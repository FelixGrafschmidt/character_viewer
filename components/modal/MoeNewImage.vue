<template>
	<form
		@click.stop
		@submit.prevent="src !== '' ? addImage() : undefined"
		class="
			justify-end
			rounded-2xl
			dark:bg-gray-800
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
	>
		<figure v-if="src" class="h-[80%] max-h-[80%]">
			<img :src="src" :alt="$t('modals.new_image.alt')" @load="valid = true" @error="valid = false" class="max-h-full" />
		</figure>
		<label class="h-[10%]">
			<span>{{ $t("modals.new_image.url") }}</span>
			<input
				v-autofocus
				:value="src"
				@blur="updateUrl"
				type="text"
				class="block rounded-lg border text-gray-900 bg-gray-300 focus:outline-none h-8 mb-8 w-80"
		/></label>
		<p v-if="!valid" class="text-red-600">{{ $t("modals.new_image.invalid") }}</p>
		<div class="h-[10%]">
			<MoeButtonDark :class="{ 'cursor-not-allowed': src === '' }" class="mt-4 mx-auto"> {{ $t("image.add") }} </MoeButtonDark>
		</div>
		<div
			@click="$vxm.main.deactivateModal()"
			class="
				items-center
				justify-center
				top-1
				right-1
				flex
				dark:bg-red-600
				bg-red-400
				dark-hover:bg-red-700
				hover:bg-red-500
				dark:text-gray-900
				text-gray-100
				h-6
				w-6
				rounded-2xl
				cursor-pointer
				absolute
			"
		>
			<div class="fas fa-times"></div>
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
		valid = true;

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
			this.$vxm.main.characterStore.addCharacterImage({ src: this.src, valid: this.valid });
			this.$vxm.main.deactivateModal();
		}
	}
</script>
