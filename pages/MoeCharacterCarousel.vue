<template>
	<div>
		<b-carousel v-model="carouselPosition" :autoplay="false" :arrow="true" :arrow-hover="false" icon-size="is-large" :progress="true" progress-type="is-link" :indicator="false" @change="updateCurrentCharacter($event)">
			<b-carousel-item v-for="character in characters" :key="character.name">
				<section :class="`hero is-medium is-blue`">
					<div class="hero-body has-text-centered">
						<moe-character-element :character="character"></moe-character-element>
					</div>
				</section>
			</b-carousel-item>
		</b-carousel>
	</div>
</template>

<script lang="ts">
	// Vue basics
	import { Component, Vue, Prop } from "nuxt-property-decorator";
	// components
	import MoeCharacterElement from "@/components/viewer/MoeCharacterElement.vue";
	// Tmodels
	import { Character } from "@/models/Character";
	import { state } from "@/store";

	@Component({
		components: { MoeCharacterElement },
	})
	export default class MoeViewer extends Vue {
		private characters: Array<Character> = [];

		@Prop({ required: false, default: 0, type: Number })
		startPosition!: number;

		private carouselPosition: number = this.startPosition !== -1 ? this.startPosition : 0;

		private updateCurrentCharacter(index: number): void {
			this.carouselPosition = index;
			this.$emit("change-character", index);
		}
	}
</script>

<style lang="scss" scoped>
	.hero-body {
		padding: unset !important;
	}
	@media screen and (max-width: 768px) {
		/deep/ .carousel-arrow {
			display: none;
		}
	}
</style>
