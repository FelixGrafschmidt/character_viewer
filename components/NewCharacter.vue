<template>
	<section v-if="imagesActive">
		<div class="columns is-multiline">
			<div v-for="(image, i) in character.images" :key="i" class="column is-one-quarter">
				<figure class="columns is-centered image is-4by7">
					<img v-if="image" :src="image" :alt="i" class="column is-7" @error="image = ''" />
				</figure>
			</div>
		</div>
		<!-- <b-carousel v-model="currentImageIndex" :autoplay="false" @change="changeItem">
			<b-carousel-item v-for="(image, i) in character.images" :key="i" class="image-carousel-item">
				<b-field class="card-content">
					<b-input ref="urlInputs" v-model="character.images[i]" placeholder="Image URL"></b-input>
				</b-field>
				<div class="card-image">
					<figure class="columns is-centered image is-4by7">
						<img v-if="image" :src="image" :alt="i" class="column is-7" @error="image = ''" />
					</figure>
				</div>
			</b-carousel-item>
		</b-carousel>
		<b-button @click="addNewImage">Add Image</b-button>
		<b-button v-if="character.images.length" @click="character.images.splice(currentImageIndex, 1)">Remove Image</b-button>
		<b-button v-else disabled>Remove Image</b-button> -->

		<b-button @click="addNewImage">Add Image</b-button>
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
	import { Character } from "~/models/Character";
	@Component({
		components: {},
		name: "NewCharacter",
	})
	export default class NewCharacter extends Vue {
		private character = new Character();
		private imagesActive = false;
		private currentImageIndex: number = NaN;

		addNewImage() {
			this.character.images.push("");
			// this.currentImageIndex = this.character.images.length - 1;
		}

		changeItem(index: number) {
			((this.$refs.urlInputs as Element[])[index] as HTMLInputElement).focus();
			this.currentImageIndex = index;
		}
	}
</script>

<style lang="scss" scoped>
	.image-card {
		border: 0px;
		box-shadow: unset;
	}
	.image-carousel-item {
		min-height: 620px;
		min-width: 728px;
	}
</style>
