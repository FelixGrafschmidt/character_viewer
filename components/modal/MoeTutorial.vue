<template>
	<div
		@click.stop
		class="rounded-2xl dark:bg-gray-700 bg-gray-400 dark:text-gray-100 text-gray-900 grid relative m-auto pb-10 max-w-4xl px-10"
	>
		<div class="text-3xl pt-8 self-center text-center">{{ $t("tutorial.title", { index: tutorial, length: 3 }) }}</div>
		<component :is="step" />
		<div class="flex justify-between w-full gap-8 mx-auto">
			<MoeButton
				:class="{ 'pointer-events-none cursor-not-allowed dark:bg-gray-500': tutorial === 1 }"
				:disabled="tutorial === 1"
				@click.native="previous"
				text="Previous"
			/>
			<MoeButton
				:class="{ 'pointer-events-none cursor-not-allowed dark:bg-gray-500': tutorial === 3 }"
				:disabled="tutorial === 3"
				@click.native="next"
				text="Next"
			/>
		</div>
	</div>
</template>

<script lang="ts">
	import { Component, Vue } from "nuxt-property-decorator";

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
	}
</script>
