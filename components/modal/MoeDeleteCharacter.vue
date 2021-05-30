<template>
	<div @click.stop class="rounded-2xl dark:bg-gray-800 bg-gray-400 dark:text-gray-100 text-gray-900 grid relative m-auto pb-10">
		<div class="mt-12 px-16">{{ $t("modals.delete_character.title", [character.name]) }}</div>
		<div class="flex m-auto pt-4">
			<MoeButtonDark
				@click.native="deleteCharacter"
				class="mr-8 !bg-red-400 dark:!bg-red-600 dark-hover:!bg-red-700 hover:!bg-red-500 !text-color-unset"
			>
				{{ $t("character.delete") }}
			</MoeButtonDark>
			<MoeButtonDark @click.native="$vxm.main.deactivateModal()">
				{{ $t("modals.delete_character.cancel") }}
			</MoeButtonDark>
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
			this.$vxm.main.listStore.deleteCharacter(this.character.id);
			this.$vxm.main.deactivateModal();
			this.$vxm.main.toList(this.$router);
		}
	}
</script>
