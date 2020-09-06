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
		<div v-if="$accessor.changes" class="unsaved-changes has-background-danger has-text-centered" @click="$accessor.saveChanges">You have unsaved changes. Click here to save them.</div>
		<section class="main-content columns">
			<aside class="column is-2 section has-border-right">
				<p class="menu-label is-hidden-touch">Characters</p>
				<ul class="menu-list">
					<li v-for="(item, key) of characterItems" :key="key">
						<nuxt-link :to="item.to.name" exact-active-class="is-active"> <b-icon :icon="item.icon" /> {{ item.title }} </nuxt-link>
					</li>
				</ul>
				<p class="menu-label is-hidden-touch">Lists</p>
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
	import { Collection } from "~/models/Collection";
	@Component({ name: "default" })
	export default class Default extends Vue {
		private changes = this.$accessor.changes;

		private mounted() {
			if (!(this.collection && this.collection.id)) {
				const collectionId = localStorage.getItem("collectionId");
				if (collectionId) {
					this.$axios
						.$get("/loadCollection", {
							params: {
								id: collectionId,
							},
						})
						.then((response: Collection) => {
							this.$accessor.setCollection(response);
						})
						.catch(() => {
							this.saveNewCollection(new Collection().init(collectionId));
						});
				} else {
					this.saveNewCollection(new Collection().init());
				}
			}
		}

		private saveNewCollection(collection: Collection) {
			this.$axios.$post("/saveCollection", collection).then().catch();
			this.$accessor.setCollection(collection);
			localStorage.setItem("collectionId", collection.id);
		}

		get collection() {
			return this.$accessor.collection;
		}

		private characterItems: Array<{ title: string; to: { name: string }; icon?: string }> = [
			{
				title: "Characters",
				// icon: "home",
				to: { name: "characters" },
			},
			{
				title: "Gallery",
				// icon: "home",
				to: { name: "gallery" },
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

<style lang="scss">
	@import "~/assets/styles.scss";
	:root {
		--color-primary: #d9ff00;
	}
</style>

<style lang="scss">
	.has-border-right {
		border-right: 2px solid var(--color-primary);
	}
	.has-border-left {
		border-left: 2px solid var(--color-primary);
	}

	.main-content {
		height: 85vh;
		margin: unset;
	}
	.footer {
		height: 10vh;
		bottom: 0;
		width: 100%;
		position: absolute;
		padding: unset;
		padding-top: 1rem;
	}
	.header {
		height: 3vh;
		background-color: #0e0e0e;
	}
	.unsaved-changes {
		cursor: pointer;
		font-weight: bold;
		height: 3vh;
		opacity: 0.5;
		&:hover {
			opacity: 1;
		}
	}
</style>
