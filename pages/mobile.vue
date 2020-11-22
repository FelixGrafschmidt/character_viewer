<template>
	<section class="columns is-mobile is-centered">
		<div v-if="mode === 'character'" class="column">
			<div class="has-text-centered">{{ character.name }}</div>
			<b-button expanded @click="mode = 'list'">Back</b-button>
			<b-image v-for="(image, i) in character.images" :key="i" class="character-image" :src="image.src" />
		</div>
		<div v-else-if="mode === 'list'" class="column">
			<div class="has-text-centered">{{ list.name }}</div>
			<b-button expanded @click="mode = 'collection'">Back</b-button>
			<b-image v-for="character in list.characters" :key="character.id" class="character-image" :src="getMainImage(character)" @click.native="selectCharacter(character)" />
		</div>
		<div v-else class="column">
			<div class="has-text-centered">{{ collection.id }}</div>
			<b-button v-for="list in collection.lists" :key="list.id" expanded @click.prevent="selectList(list)">{{ list.name }}</b-button>
		</div>
	</section>
</template>

<script lang="ts">
	// Vue basics
	import { Component, Vue } from "nuxt-property-decorator";
	import { Character, newCharacter } from "~/models/interfaces/Character";
	import { Collection, newCollection } from "~/models/interfaces/Collection";
	import { List, newList } from "~/models/interfaces/List";

	@Component({ name: "mobile", layout: "mobile" })
	export default class Mobile extends Vue {
		collection: Collection = newCollection("");
		list: List = newList();
		character: Character = newCharacter();
		mode: string = "collection";

		mounted() {
			if (this.$route.query.id) {
				this.$axios
					.$get("loadCollection", {
						params: {
							id: this.$route.query.id,
						},
					})
					.then((response: Collection) => {
						this.collection = response;
					})
					.catch((error) => {
						console.error(error);
					});
			} else {
				this.$buefy.dialog.prompt({
					inputAttrs: {
						placeholder: "Collection ID",
					},
					message: "",
					canCancel: false,
					confirmText: "Load",
					trapFocus: true,
					onConfirm: (value) => {
						this.$axios
							.$get("loadCollection", {
								params: {
									id: value,
								},
							})
							.then((response: Collection) => {
								this.collection = response;
							})
							.catch((error) => {
								console.error(error);
							});
					},
				});
			}
		}

		selectList(list: List) {
			this.list = list;
			this.changeMode("list");
		}

		selectCharacter(character: Character) {
			this.character = character;
			this.changeMode("character");
		}

		changeMode(mode: string) {
			this.mode = mode;
		}

		getMainImage(character: Character) {
			let imageResult;
			character.images.forEach((image) => {
				if (image.main) {
					imageResult = image.src;
				}
			});
			return imageResult;
		}
	}
</script>

<style lang="scss" scoped>
	.columns {
		margin: unset;
	}
	.button {
		margin-top: 1rem;
	}
	.character-image {
		margin-top: 1rem;
	}
</style>
