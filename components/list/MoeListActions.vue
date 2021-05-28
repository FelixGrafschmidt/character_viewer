<template>
	<div class="flex my-6 justify-center">
		<MoeButtonLight :text="$t('character.add')" @click.native="addNewCharacter" icon="fas fa-plus-square" class="w-24" />
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
