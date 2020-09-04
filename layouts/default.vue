<template>
	<div>
		<nav class="navbar header has-shadow" role="navigation" aria-label="main navigation">
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
			<!-- <div class="navbar-end">
				<div class="navbar-item">
					<div class="navbar-item has-dropdown is-hoverable">
						<a class="navbar-link">
							{{ $t("language") }}
						</a>

						<div class="navbar-dropdown">
							<nuxt-link v-for="locale in availableLocales" :key="locale.code" class="navbar-item" :to="switchLocalePath(locale.code)">{{ locale.code }}</nuxt-link>
						</div>
					</div>
				</div>
			</div> -->
		</nav>

		<section class="main-content columns">
			<aside class="column is-2 section has-border-right">
				<p class="menu-label is-hidden-touch">
					Characters
				</p>
				<ul class="menu-list">
					<li v-for="(item, key) of characterItems" :key="key">
						<nuxt-link :to="item.to.name" exact-active-class="is-active"> <b-icon :icon="item.icon" /> {{ item.title }} </nuxt-link>
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
		<footer class="footer">
			<div class="content has-text-centered">
				<nuxt-link :to="'imprint'">Imprint</nuxt-link>
				<nuxt-link :to="'faq'">FAQ</nuxt-link>
			</div>
			<div class="content has-text-centered">© Felix Grafschmidt {{ new Date().getFullYear() }}</div>
		</footer>
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
				to: { name: "lists" },
			},
		];

		// get availableLocales() {
		// 	const result: Array<NuxtVueI18n.Options.LocaleObject> = [];
		// 	this.$i18n.locales!.forEach((locale) => {
		// 		result.push(locale as NuxtVueI18n.Options.LocaleObject);
		// 	});
		// 	return result;
		// }
	}
</script>

<style lang="scss" scoped>
	@import "~/assets/styles.scss";
	.has-border-right {
		border-right: 2px solid $primary;
	}
	.has-border-left {
		border-left: 2px solid $primary;
	}

	.main-content {
		min-height: 80vh;
		height: auto;
	}
	.footer {
		max-height: 10vh;
		bottom: 0;
		width: 100%;
		position: absolute;
	}
</style>
