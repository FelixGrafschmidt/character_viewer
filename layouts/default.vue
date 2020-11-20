<template>
	<div>
		<nav class="navbar header has-shadow" role="navigation" aria-label="main navigation">
			<div class="navbar-brand">
				<div class="navbar-burger">
					<span />
					<span />
					<span />
				</div>
			</div>
			<div class="navbar-start">
				<div class="navbar-item">
					<nuxt-link class="title logo" to="/" tag="h1">Character List Manager</nuxt-link>
				</div>
				<div class="navbar-item">
					Autosave:&nbsp;
					<p v-if="autosave" class="has-text-success">on</p>
					<p v-else class="has-text-danger">off</p>
				</div>
				<div class="navbar-item">
					<b-button v-if="autosave" size="is-small" @click="disableAutosave">Disable autosave</b-button>
					<b-button v-else size="is-small" @click="enableAutosave">Enable autosave</b-button>
				</div>
			</div>
			<div class="navbar-end">
				<div class="navbar-item">
					{{ $accessor.collection.id }}
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
		<div v-if="$accessor.changes" class="unsaved-changes has-background-danger has-text-centered" @click="saveChanges">You have unsaved changes. Click here to save them.</div>
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
				<nuxt-link class="footer_link" :to="'imprint'">Imprint</nuxt-link>
				<nuxt-link class="footer_link" :to="'faq'">FAQ</nuxt-link>
			</div>
			<div class="content has-text-centered">© Felix Grafschmidt {{ new Date().getFullYear() }}</div>
		</footer>
		<b-modal v-model="saveError" class="error_modal" scroll="keep" :full-screen="false" has-modal-card :destroy-on-hide="false" aria-role="dialog" aria-modal>
			<div class="card">
				<div class="card-content">
					<div class="content">An error has occurred while saving your changes. Your changes have NOT been saved!</div>
					<div class="buttons has-text-centered is-centered">
						<b-button @click="saveChanges">Try again</b-button>
						<b-button @click="exportData">Export your data</b-button>
						<b-button @click="contactUs">Contact us</b-button>
					</div>
				</div>
			</div>
		</b-modal>
		<b-modal v-model="contactUsActive" class="error_modal" scroll="keep" :full-screen="false" has-modal-card :destroy-on-hide="false" aria-role="dialog" aria-modal>
			<div class="card is-danger">
				<div class="card-content">
					<div class="content">
						Feel free to <a target="_blank" href="https://github.com/Ithambar/character_viewer/issues/new">raise an issue</a> on our Github page or
						<a target="_blank" href="https://github.com/Ithambar/character_viewer/issues">add more info</a> to an existing issue.
						<br />
						You can also <a target="_blank" href="mailto:ithambar.lethenain@gmail.com?subject=Issue%20on%20character%20manager%20webpage">send us an eMail</a>.
					</div>
				</div>
			</div>
		</b-modal>
		<b-loading v-model="isLoading" :is-full-page="true" :can-cancel="false"></b-loading>
	</div>
</template>

<script lang="ts">
	// Vue basics
	import { Component, Vue } from "nuxt-property-decorator";
	import { Collection } from "@/models/Collection";
	@Component({ name: "default" })
	export default class Default extends Vue {
		private changes = this.$accessor.changes;
		private saveError = false;
		private isLoading = false;
		private contactUsActive = false;
		private autosave = false;
		private autosaveId = 0;

		private mounted() {
			this.performAutosave();
			if (!(this.collection && this.collection.id)) {
				const collectionId = localStorage.getItem("collectionId");
				if (collectionId) {
					this.$axios
						.$get("/loadCollection", {
							params: {
								id: collectionId,
							},
						})
						.then((response: string) => {
							this.$accessor.setCollection(new Collection().fromJSON(response));
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
			this.$axios
				.$post("/saveCollection", collection)
				.then(() => {
					this.saveError = false;
				})
				.catch();
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

		private saveChanges(): Promise<void> {
			this.isLoading = true;
			return this.$accessor
				.saveChanges()
				.then()
				.catch(() => {
					this.isLoading = false;
					this.saveError = true;
				})
				.finally(() => {
					this.isLoading = false;
				});
		}

		private contactUs() {
			this.saveError = false;
			this.contactUsActive = true;
		}

		private exportData() {}

		// get availableLocales() {
		// 	const result: Array<NuxtVueI18n.Options.LocaleObject> = [];
		// 	this.$i18n.locales!.forEach((locale) => {
		// 		result.push(locale as NuxtVueI18n.Options.LocaleObject);
		// 	});
		// 	return result;
		// }

		private enableAutosave() {
			this.autosave = true;
		}

		private disableAutosave() {
			this.autosave = false;
		}

		private performAutosave() {
			this.autosaveId = window.setInterval(() => {
				if (this.autosave) {
					this.$accessor.saveChanges();
				}
			}, 1000 * 60);
		}

		private beforeDestory() {
			window.clearInterval(this.autosaveId);
		}
	}
</script>

<style lang="scss">
	@import "@/assets/styles.scss";
	:root {
		--color-primary: #d9ff00;
		--color-secondary: #02fdff;
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
	.logo {
		cursor: pointer;
	}
	.footer_link {
		padding: 1rem;
	}
	.error_modal {
		color: white;
	}
	body::-webkit-scrollbar {
		width: 0.2em;
	}
	body::-webkit-scrollbar-track {
		-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
		box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
	}
	body::-webkit-scrollbar-thumb {
		background-color: var(--color-secondary);
		outline: 1px solid black;
	}
</style>
