<template>
	<div class="flex my-6 justify-center">
		<MoeButton :text="$t('character.add')" class="w-64 mr-2" color="dark:bg-gray-600 bg-gray-400" @click.native="addNewCharacter" />
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
