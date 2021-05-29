<template>
	<div class="flex my-6 justify-center">
		<MoeTooltip :text="$t('character.add')" position="top">
			<MoeButtonLight @click.native="addNewCharacter" icon="fas fa-plus" class="w-24" />
		</MoeTooltip>
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
