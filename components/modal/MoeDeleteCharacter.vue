<template>
	<div class="rounded-2xl dark:bg-gray-700 bg-gray-400 dark:text-gray-100 text-gray-900 grid relative m-auto pb-10" @click.stop>
		<div class="mt-12 px-16">Are you sure you want to delete {{ character.name }}?</div>
		<div class="flex m-auto pt-4">
			<MoeButton class="mr-8" color="bg-red-500" text="Delete" @click.native="deleteCharacter" />
			<MoeButton text="Cancel" @click.native="$vxm.main.deactivateModal()" />
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
			@click="$vxm.main.deactivateModal()"
		>
			X
		</div>
	</div>
</template>

<script lang="ts">
	import { Component, Vue } from "nuxt-property-decorator";

	@Component({
		components: {},
		name: "MoeDeleteCharacter",
	})
	export default class MoeDeleteCharacter extends Vue {
		get character() {
			return this.$vxm.main.characterStore.character;
		}

		deleteCharacter() {
			this.$vxm.main.listStore.deleteCharacter(this.character);
			this.$vxm.main.deactivateModal();
			this.$router.push(this.$vxm.main.navigationPaths.list);
		}
	}
</script>
