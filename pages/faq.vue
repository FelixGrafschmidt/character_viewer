<template>
	<div>
		<section class="section hero">
			<div class="hero-body">
				<div class="container">
					<h1 class="title">
						FAQ
					</h1>
					<h2 class="subtitle">
						Frequently asked questions
					</h2>
				</div>
			</div>
		</section>
	</div>
</template>

<script lang="ts">
	import { Component, Vue } from "nuxt-property-decorator";
	@Component({ name: "faq" })
	export default class FAQ extends Vue {}
</script>
