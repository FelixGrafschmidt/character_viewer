<template>
	<div>
		<nav class="navbar header has-shadow is-link" role="navigation" aria-label="main navigation">
			<div class="navbar-brand">
				<!-- <a class="navbar-item" href="/">
					<img src="~assets/buefy.png" alt="Buefy" height="28" />
				</a> -->

				<div class="navbar-burger">
					<span />
					<span />
					<span />
				</div>
			</div>
		</nav>

		<section class="main-content columns">
			<aside class="column is-2 section has-border-right">
				<p class="menu-label is-hidden-touch">
					Characters
				</p>
				<ul class="menu-list">
					<li v-for="(item, key) of characterItems" :key="key">
						<nuxt-link :to="item.to" exact-active-class="is-active"> <b-icon :icon="item.icon" /> {{ item.title }} </nuxt-link>
					</li>
				</ul>
				<p class="menu-label is-hidden-touch">
					Lists
				</p>
				<ul class="menu-list">
					<li v-for="(item, key) of listItems" :key="key">
						<nuxt-link :to="item.to" exact-active-class="is-active"> <b-icon :icon="item.icon" /> {{ item.title }} </nuxt-link>
					</li>
				</ul>
			</aside>

			<div class="container column is-10">
				<nuxt />
			</div>
		</section>
	</div>
</template>

<script lang="ts">
	// Vue basics
	import { Component, Vue } from "nuxt-property-decorator";
	@Component({ name: "default" })
	export default class Default extends Vue {
		private characterItems: Array<{ title: string; to: { name: string }; icon?: string }> = [
			{
				title: "Character-Carousel",
				// icon: "home",
				to: { name: "MoeCharacterCarousel" },
			},
			{
				title: "Character-Table",
				// icon: "home",
				to: { name: "MoeCharacterTable" },
			},
		];

		private listItems: Array<{ title: string; to: { name: string }; icon?: string }> = [
			{
				title: "List-Manager",
				// icon: "home",
				to: { name: "MoeListManager" },
			},
		];
	}
</script>

<style lang="scss" scoped>
	.has-border-right {
		border-right: 2px solid #00ffff;
	}
	.has-border-left {
		border-left: 2px solid #00ffff;
	}
</style>
