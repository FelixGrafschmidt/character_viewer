<template>
	<section class="section hero">
		<div class="hero-body">
			<div class="container wrapper">
				<div v-if="initialVisit" class="introduction">
					<h2 class="title is-4 is-spaced">Welcome! This appears to be your first visit.</h2>
					<h3 class="subtitle is-5">
						On this website you are able to manage lists of characters with a lot of customization ability. To achieve that, you were just assigned a collection id. You can see it in the top right corner. This id is saved on
						your harddrive (we are using your browser's <a target="_blank" href="https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage"> localStorage </a>). If you ever want to change your browser or clear your
						locally saved data but also wish to keep your lists, make sure to save that id somewhere.
					</h3>
					<h3 class="subtitle is-5">A collection consists of one or more lists. Each of these lists consists of one or more characters and those consist of attributes and lists of subcharacters.</h3>
					<h3 class="subtitle is-5">
						This might sound like a lot right now, so to get going, let's
						<nuxt-link to="/lists"> create a new list. </nuxt-link>
					</h3>
				</div>
				<div v-else>
					<h2 class="subtitle">To get started select a menu item on the left</h2>
				</div>
			</div>
		</div>
	</section>
</template>

<script lang="ts">
	import { Component, Vue } from "nuxt-property-decorator";

	@Component({
		components: {},
		name: "index",
	})
	export default class Index extends Vue {
		private initialVisit: boolean = false;

		private mounted(): void {
			this.initialVisit = localStorage.getItem("collectionId") === null;
		}
	}
</script>
<style lang="scss" scoped>
	.wrapper {
		width: 80%;
	}
</style>
