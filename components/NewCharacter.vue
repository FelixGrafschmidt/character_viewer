<template>
	<div>
		<section>
			<b-field label="Name">
				<b-input v-model="character.name"></b-input>
			</b-field>
			<b-field label="Origin">
				<b-input v-model="character.origin"></b-input>
			</b-field>
			<b-button @click="imagesActive = true">Show Images</b-button>
		</section>
		<b-modal v-model="imagesActive" class="error_modal" scroll="keep" :full-screen="false" has-modal-card :destroy-on-hide="false" aria-role="dialog" aria-modal>
			<div class="card is-danger">
				<div class="card-content">
					<div class="content">
						<div>
							<div v-for="(image, index) in character.images" :key="index" class="card image-card">
								<b-field class="card-content">
									<b-input v-model="character.images[index]"></b-input>
								</b-field>
								<div class="card-image">
									<figure class="columns is-centered image is-4by7">
										<img :src="image" :alt="index" class="column is-7" />
									</figure>
								</div>
							</div>
							<b-button @click="character.images.push('')">Add Image</b-button>
						</div>
					</div>
				</div>
			</div>
		</b-modal>
	</div>
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
	}
</script>

<style lang="scss" scoped>
	.image-card {
		border: 0px;
		box-shadow: unset;
	}
</style>
