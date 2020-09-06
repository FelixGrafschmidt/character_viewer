<template>
	<div>
		<section class="section hero">
			<div class="hero-body">
				<div class="container">
					<h1 class="title">Character List Manager</h1>
					<h2 class="subtitle">To get started select a menu item on the left</h2>
					<h3>First time visit? Start by creating a <nuxt-link to="lists">new list</nuxt-link></h3>
				</div>
			</div>
		</section>
	</div>
</template>

<script lang="ts">
	import { Component, Vue } from "nuxt-property-decorator";

	@Component({
		components: {},
		name: "index",
	})
	export default class Index extends Vue {}
</script>
