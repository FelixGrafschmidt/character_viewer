<template>
	<section class="section has-text-centered">
		<h1 class="title is-1">{{ error.statusCode }}</h1>
		<h2 class="title is-3">{{ error.statusCode === 404 ? "Page not found" : "An error occurred" }}</h2>
		<nuxt-link tag="a" class="title is-5 has-text-link" to="/">Home page</nuxt-link>
	</section>
</template>

<script lang="ts">
	import { Component, Vue, Prop } from "nuxt-property-decorator";
	@Component
	export default class error extends Vue {
		@Prop({ required: true, default: () => {} })
		private error!: { message: string; statusCode: number; path: string };
	}
	// export default {}
	// 	props: {
	// 		error: {
	// 			type: Object,
	// 			default: () => {},
	// 		},
	// 	},
	// 	// layout: "blog", // you can set a custom layout for the error page
	// };
</script>
