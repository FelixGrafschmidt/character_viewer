<template>
	<div class="flex my-6 justify-center gap-2">
		<MoeTooltip :text="$t('character.add')" position="top">
			<MoeButtonLight @click.native="addNewCharacter" icon="fas fa-user-plus" class="w-24" />
		</MoeTooltip>

		<MoeTooltip text="Add Attributes to all Characters" position="top">
			<MoeButtonLight @click.native="addListAttribute" icon="fas fa-folder-plus" class="w-24" />
		</MoeTooltip>
	</div>
</template>

<script lang="ts">
	import { Component, Vue } from "nuxt-property-decorator";
	import { Modal } from "~/models/enums/Modal";
	import { newCharacter } from "~/models/interfaces/Character";

	@Component({
		components: {},
		name: "MoeListActions",
	})
	export default class MoeListActions extends Vue {
		addNewCharacter() {
			this.$vxm.main.characterStore.setCharacter(newCharacter());
			this.$vxm.main.toCharacter(this.$router);
		}

		addListAttribute() {
			this.$vxm.main.setModal(Modal.NEWATTRIBUTE);
		}
	}
</script>
