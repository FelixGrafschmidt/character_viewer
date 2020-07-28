<template>
	<div class="is-centered has-text-centered">
		<h2 class="moe-origin title is-2">{{ character.origin }}</h2>
		<div class="moe-character-card">
			<button class="button" :class="character.variants.length > 0 ? 'is-success' : 'is-disabled'" @click="toggleVariants">
				{{ character.variants.length > 0 ? (variantsVisible ? "Hide variants" : "Show variants") : "No variants" }}
			</button>
			<button :class="character.partners.length > 0 ? 'is-success' : 'is-disabled'" class="button" @click="togglePartners">
				{{ character.partners.length > 0 ? (partnersVisible ? "Hide partners" : "Show partners") : "No partners" }}
			</button>
			<div v-if="!partnersVisible && !variantsVisible" class="columns">
				<div class="column">
					<h3 class="title is-3 moe-character-name">{{ character.name }}</h3>
					<img :alt="character.name" class="character-image" :src="character.imageUrl" />
				</div>
			</div>
			<div v-if="variantsVisible" class="columns">
				<div v-for="variant in character.variants" :key="variant.name" class="column">
					<h3 class="title is-3 moe-character-name">{{ variant.name }}</h3>
					<img :alt="variant.name" class="character-image" :src="variant.imageUrl" />
				</div>
			</div>
			<div v-if="partnersVisible" class="columns">
				<div v-for="partner in character.partners" :key="partner.name" class="column">
					<h3 class="title is-3 moe-character-name">{{ partner.name }}</h3>
					<img :alt="partner.name" class="character-image" :src="partner.imageUrl" />
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
	import { Component, Prop, Vue } from "nuxt-property-decorator";
	import { Character } from "@/models/Character";

	@Component
	export default class MoeCharacterElement extends Vue {
		@Prop({ required: true, type: Object })
		private character!: Character;

		variantsVisible: boolean = false;
		partnersVisible: boolean = false;

		private toggleVariants(): void {
			this.variantsVisible = !this.variantsVisible;
			this.partnersVisible = false;
		}

		private togglePartners(): void {
			this.partnersVisible = !this.partnersVisible;
			this.variantsVisible = false;
		}
	}
</script>

<style scoped lang="scss">
	.is-disabled {
		pointer-events: none;
		background: #ff000020;
	}
	.character-image {
		max-width: 70vw;
		height: 60vh;
	}
	.moe-character-name {
		padding-top: 5px;
	}
	.moe-character-card {
		min-height: 80vh;
	}
	@media screen and (min-width: 769px) {
		.moe-origin {
			padding-top: 30px;
		}
	}
	@media screen and (max-width: 768px) {
		.character-image {
			max-width: 100vw;
		}
		.moe-origin {
			font-size: 6vw !important;
		}
		.moe-character-name {
			font-size: 5vw !important;
		}
	}
</style>
