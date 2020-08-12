<template>
	<div>
		<section class="section hero">
			<div class="hero-body">
				<div class="container">
					<h1 class="title">
						Character List Manager
					</h1>
					<h2 class="subtitle">
						To get started select a menu item on the left
					</h2>
				</div>
			</div>
		</section>
	</div>
</template>

<script lang="ts">
	import { Component, Vue } from "nuxt-property-decorator";
	@Component({ name: "index" })
	export default class Index extends Vue {}
</script>
