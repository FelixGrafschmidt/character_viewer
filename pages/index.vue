<template>
	<section class="section">
		<div class="columns is-mobile">
			<card title="Free" icon="github-circle">
				Open source on
				<a href="https://github.com/buefy/buefy">
					GitHub
				</a>
			</card>

			<card title="Responsive" icon="cellphone-link">
				<strong class="has-text-grey">
					Every
				</strong>
				component is responsive
			</card>

			<card title="Modern" icon="alert-decagram">
				Built with
				<a href="https://vuejs.org/">
					Vue.js
				</a>
				and
				<a href="http://bulma.io/">
					Bulma
				</a>
			</card>

			<card title="Lightweight" icon="arrange-bring-to-front">
				No other internal dependency
			</card>
		</div>
	</section>
</template>

<script>
	import {Vue, Component} from "vue-property-decorator";
	import Card from "@/components/Card";

	@Component({
		name: "HomePage",
		components: {Card},
	})
	export default class ChordProgressionGenerator extends Vue {}
</script>
