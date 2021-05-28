<template>
	<div class="flex my-6 justify-center">
		<div class="has-tooltip flex flex-col items-center">
			<MoeButtonLight :text="$t('character.add')" @click.native="addNewCharacter" icon="fas fa-plus-square" class="w-24" />
			<span class="tooltip bg-gray-700 dark:bg-gray-700 rounded w-20 text-center mx-auto mt-10 p-1"> {{ $t("character.add") }} </span>
		</div>
	</div>
</template>

<script lang="ts">
	import { Component, Vue } from "nuxt-property-decorator";
	import { newCharacter } from "~/models/interfaces/Character";

	@Component({
		components: {},
		name: "MoeListActions",
	})
	export default class MoeListActions extends Vue {
		addNewCharacter() {
			this.$vxm.main.characterStore.setCharacter(newCharacter());
			this.$router.push(this.$vxm.main.navigationPaths.character);
		}
	}
</script>
