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
		@click.stop
	>
		<label class="mx-12 mt-8">
			<span class="ml-2">{{ $t("modals.load_collection.title") }}</span>
			<input
				v-model="id"
				v-autofocus
				type="text"
				class="block rounded-lg border text-gray-900 bg-gray-300 focus:outline-none h-8 mb-8 mt-2 mx-2 sm:w-80"
			/>
		</label>

		<MoeButton :text="$t('collection.load')" :class="{ 'cursor-not-allowed': id === '' }" class="m-auto" />
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
			this.$vxm.main.collectionStore.loadCollection(this.$axios);
			this.$vxm.main.deactivateModal();
		}
	}
</script>
