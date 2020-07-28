<template>
	<section>
		<div class="card column">
			<button class="button is-danger delete-sub-character-button" @click="$emit('delete-character', character)">
				X
			</button>

			<div class="has-text-centered is-centered columns">
				<b-field type="is-link" label="Name" class="field column is-7">
					<b-input v-model="character.name" size="is-medium"></b-input>
				</b-field>
			</div>

			<div class="has-text-centered is-centered columns">
				<b-field type="is-link" label="Image URL" class="field column is-7">
					<b-input v-model="character.imageUrl" size="is-medium"></b-input>
				</b-field>
			</div>
			<div v-if="character.imageUrl" class="card image-card">
				<div v-show="imageVisible" class="card-image">
					<figure class="character-image-container columns is-centered image is-4by7">
						<img :src="character.imageUrl" :alt="character.name" class="character-image column is-7" @mouseover="imageHovered = true" @mouseleave="imageHovered = false" />
					</figure>
				</div>
				<div class="card-content is-overlay has-text-centered columns is-centered is-vcentered" :class="imageVisible && !imageHovered ? 'invisible-hover-element' : 'visible-hover-element'">
					<div class="column hover-element-container" @mouseleave="imageHovered = false" @mouseover="imageHovered = true">
						<b-button class="image-toggler button tag is-link is-outlined is-3" @click="toggleImage">
							{{ imageVisible ? "Hide image preview" : "Show image preview" }}
						</b-button>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script lang="ts">
	import { Component, Prop, Vue } from "nuxt-property-decorator";
	import { SubCharacter } from "@/models/Character";

	@Component
	export default class MoeEditSubCharacterElement extends Vue {
		@Prop({ required: true, type: Object })
		private initialCharacter!: SubCharacter;

		private character: SubCharacter = this.initialCharacter;
		private imageVisible: boolean = true;
		private imageHovered: boolean = false;

		private toggleImage(): void {
			this.imageVisible = !this.imageVisible;
		}
	}
</script>

<style lang="scss" scoped>
	.image-toggler-container {
		margin-bottom: unset !important;
	}
	.image-toggler {
		padding: unset !important;
		width: 50%;
		margin-top: 0.6rem;
	}
	.image-card {
		border: 0px !important;
		box-shadow: unset !important;
		min-height: 100px;
	}
	.character-image {
		padding-top: unset !important;
	}
	.character-image-container {
		margin-top: unset !important;
	}
	.sub-characters-container {
		padding-top: 20px;
	}
	.card-content {
		height: 10%;
		padding-top: 0.7rem;
		padding-bottom: unset;
		min-height: 5rem;
	}
	.delete-sub-character-button {
		right: 10px;
		top: 10px;
		position: absolute;
	}
	.invisible-hover-element {
		opacity: 0;
	}
	.visible-hover-element {
		opacity: 0.5;
		background-color: #080808;
	}
	.hover-element-container {
		width: 59%;
		flex: none;
		height: 100%;
	}
</style>
