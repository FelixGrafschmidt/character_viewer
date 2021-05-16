<template>
	<div v-if="initialVisit" class="my-20">
		<h2 class="text-xl font-bold">Welcome! This appears to be your first visit.</h2>
		<h3 class="py-2">
			On this website you are able to manage lists of characters with a lot of customization ability. To achieve that, you were just
			assigned a collection id. You can see it in the top right corner. This id is saved on your harddrive (we are using your
			browser's
			<a
				class="dark-hover:text-blue-300 hover:text-blue-700 text-blue-500"
				target="_blank"
				href="https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage"
			>
				localStorage </a
			>). If you ever want to change your browser or clear your locally saved data but also wish to keep your lists, make sure to save
			that id somewhere.
		</h3>
		<h3 class="py-2">
			A collection consists of one or more lists. Each of these lists consists of one or more characters and those consist of
			attributes and lists of subcharacters.
		</h3>
		<h3 class="py-2">
			This might sound like a lot right now, so to get going, let's
			<nuxt-link class="dark-hover:text-blue-300 hover:text-blue-700 text-blue-500" to="/lists"> create a new list. </nuxt-link>
		</h3>
	</div>
	<div v-else class="my-20">
		<h2 class="text-xl font-bold">To get started select a menu item on the left</h2>
	</div>
</template>

<script lang="ts">
	import { Component, Vue } from "nuxt-property-decorator";

	@Component({
		components: {},
		name: "index",
	})
	export default class Index extends Vue {
		initialVisit: boolean = false;

		fetch() {
			if (this.$accessor.collection.lists.length === 0) {
				this.initialVisit = true;
			}
		}
	}
</script>
