<template>
	<div
		@click.stop
		class="
			w-[80vw]
			rounded-2xl
			dark:bg-gray-800
			bg-gray-400
			dark:text-gray-100
			text-gray-900
			grid
			relative
			m-auto
			pb-10
			max-w-4xl
			px-10
		"
	>
		<div class="text-3xl pt-8 pb-10 self-center text-center h-12">{{ $t("tutorial.title") }}</div>
		<div class="flex justify-center w-full">
			<div class="w-36 bg-gray-600 h-2 rounded flex">
				<div
					v-for="index in tutorial"
					:key="index"
					:class="{
						'rounded-r': index === 3,
						'rounded-l': index === 1,
					}"
					class="h-2 w-12 bg-teal-400"
				></div>
			</div>
		</div>
		<div class="flex justify-between">
			<MoeButtonDark
				:class="{ 'pointer-events-none cursor-not-allowed !bg-gray-500 dark:bg-gray-500': tutorial === 1 }"
				:disabled="tutorial === 1"
				@click.native="previous"
				icon="fas fa-angle-left"
			/>
			<component :is="step" class="h-72 pt-8 px-8 w-full" />
			<MoeButtonDark
				:class="{ 'pointer-events-none cursor-not-allowed !bg-gray-500 dark:bg-gray-500': tutorial === 3 }"
				:disabled="tutorial === 3"
				@click.native="next"
				icon="fas fa-angle-right"
			/>
		</div>
		<div class="flex justify-center h-8">
			<MoeButtonDark v-show="tutorial === 3" @click.native="newList"> {{ $t("list.create") }} </MoeButtonDark>
		</div>
	</div>
</template>

<script lang="ts">
	import { Component, Vue } from "nuxt-property-decorator";
	import { Modal } from "~/models/enums/Modal";

	@Component({
		components: {},
		name: "MoeContactUs",
	})
	export default class MoeContactUs extends Vue {
		get tutorial() {
			return this.$vxm.main.tutorial;
		}

		get step() {
			return `MoeTutorial${this.tutorial}`;
		}

		mounted() {
			window.localStorage.setItem("tutorial", this.tutorial.toString());
		}

		next() {
			this.$vxm.main.nextTutorial();
			window.localStorage.setItem("tutorial", this.tutorial.toString());
		}

		previous() {
			this.$vxm.main.previousTutorial();
			window.localStorage.setItem("tutorial", this.tutorial.toString());
		}

		newList() {
			this.$vxm.main.deactivateModal();
			this.$router.push(this.$vxm.main.navigationPaths.collection);
			this.$vxm.main.setModal(Modal.NEWLIST);
		}
	}
</script>
