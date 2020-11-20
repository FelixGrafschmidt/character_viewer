<template>
	<section v-if="imagesActive">
		<div class="columns is-centered is-multiline">
			<div class="column is-half active-image-wrapper">
				<figure class="columns is-centered image is-4by7 active-image-wrapper">
					<img v-if="character.images[activeImageIndex]" class="column is-10 active-image" :src="character.images[activeImageIndex].src" alt="active Image" @load="activeImageLoading = false" @error="activeImageLoading = false" />
					<b-loading v-model="activeImageLoading" :is-full-page="false" :can-cancel="true">
						<b-icon pack="fas" icon="sync-alt" size="is-large" custom-class="fa-spin"> </b-icon>
					</b-loading>
				</figure>
			</div>
			<section class="column is-half columns is-multiline gallery">
				<div v-for="(image, i) in character.images" :key="i" class="column is-one-quarter">
					<figure class="gallery-image-wrapper columns is-centered image is-4by7">
						<img v-if="image" :src="image.src" :alt="i" class="column is-7 gallery-image" @click="changeActiveImage(i)" @error="image.src = ''" />
					</figure>
				</div>
			</section>
		</div>
		<div class="columns _add-image-wrapper mt-1">
			<b-button class="column" type="is-primary" outlined @click="imagesActive = false">Back to Character</b-button>
			<b-button :disabled="Number.isNaN(activeImageIndex)" class="column" type="is-link" outlined @click="designateMainImage">Designate as Main Image</b-button>
			<b-button :disabled="Number.isNaN(activeImageIndex)" class="column" type="is-danger" outlined @click="removeImage">Remove this Image</b-button>
			<b-button class="column" outlined type="is-success" @click="addNewImage">Add new Image</b-button>
		</div>
	</section>
	<section v-else>
		<b-field label="Name">
			<b-input v-model="character.name"></b-input>
		</b-field>
		<b-field label="Origin">
			<b-input v-model="character.origin"></b-input>
		</b-field>
		<b-button @click="imagesActive = true">Show Images</b-button>
	</section>
</template>

<script lang="ts">
	// Vue basics
	import { Component, Vue } from "nuxt-property-decorator";
	import { Character, CharacterImage } from "~/models/Character";
	@Component({
		components: {},
		name: "NewCharacter",
	})
	export default class NewCharacter extends Vue {
		character = new Character();
		imagesActive = false;
		activeImageIndex: number = NaN;
		activeImageLoading: boolean = false;

		addNewImage() {
			this.$buefy.dialog.prompt({
				message: "Enter image URL",
				trapFocus: true,
				scroll: "keep",
				onConfirm: (value) => {
					this.character.images.push(new CharacterImage(value));
					if (!this.activeImageIndex) {
						this.character.images[0].main = true;
						this.activeImageIndex = 0;
					}
				},
			});
		}

		removeImage() {
			let wasMain;
			if (this.character.images[this.activeImageIndex].main) {
				wasMain = true;
			}
			this.character.images.splice(this.activeImageIndex, 1);
			if (wasMain) {
				if (this.character.images[0]) {
					this.character.images[0].main = true;
				}
			}
			if (this.character.images.length) {
				this.activeImageIndex = 0;
			} else {
				this.activeImageIndex = NaN;
			}
		}

		designateMainImage() {
			this.character.images.forEach((image, index) => {
				image.main = index === this.activeImageIndex;
			});
		}

		changeActiveImage(i: number) {
			if (this.character.images[this.activeImageIndex].src === this.character.images[i].src) {
				this.activeImageIndex = i;
				return;
			}
			this.activeImageLoading = true;
		}
	}
</script>

<style lang="scss" scoped>
	.gallery {
		max-height: 75vh;
		min-height: 75vh;
		overflow: auto;
	}
	.active-image-wrapper {
		max-height: 75vh;
		min-height: 75vh;
	}
	.active-image {
		object-fit: contain;
	}
	.gallery-image-wrapper {
		max-height: 15rem;
		min-height: 15rem;
		max-width: 10rem;
		min-width: 10rem;
	}
	.gallery-image {
		object-fit: contain;
		cursor: pointer;
		width: 100%;
	}
	.gallery::-webkit-scrollbar {
		width: 0.2em;
	}
	.gallery::-webkit-scrollbar-track {
		-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
		box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
	}
	.gallery::-webkit-scrollbar-thumb {
		background-color: var(--color-secondary);
		outline: 1px solid black;
	}
	.add-image-wrapper {
		width: 20%;
	}
</style>
