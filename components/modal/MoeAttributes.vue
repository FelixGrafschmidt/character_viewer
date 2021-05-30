<template>
	<div
		@click.stop
		class="
			flex flex-col
			rounded-2xl
			dark:bg-gray-800
			bg-gray-400
			dark:text-gray-100
			text-gray-900
			relative
			m-auto
			pb-10
			pt-5
			max-h-[80vh]
			w-[60vw]
		"
	>
		<div class="flex justify-evenly max-h-[85%] min-h-[85%]">
			<div>
				<span>Select all Characters to apply these attributes to</span>
				<div
					class="
						flex flex-col
						scrollbar-thin scrollbar-track-gray-300 scrollbar-thumb-gray-500
						dark:scrollbar-track-gray-700 dark:scrollbar-thumb-gray-500
						scrollbar-track-rounded scrollbar-thumb-rounded
						overflow-y-scroll
						max-h-[90%]
						min-h-[90%]
						px-4
						mt-4
					"
				>
					<label
						ref="characters"
						:id="character.id"
						v-for="character in characters"
						:key="character.id"
						class="flex flex-row items-center py-1"
					>
						<input
							type="checkbox"
							checked
							class="rounded text-teal-500 !focus:outline-none !shadow-none !ring-offset-0 !ring-0"
						/>
						<span class="ml-1 select-none"> {{ character.name }} </span>
					</label>
				</div>
			</div>
			<form @submit.prevent class="flex flex-col">
				<div
					class="
						scrollbar-thin scrollbar-track-gray-300 scrollbar-thumb-gray-500
						dark:scrollbar-track-gray-700 dark:scrollbar-thumb-gray-500
						scrollbar-track-rounded scrollbar-thumb-rounded
						overflow-y-scroll
						px-2
					"
				>
					<div v-for="(attribute, i) in attributes" :key="i">
						<MoeTooltip text="Remove Attribute" position="left" extra-classes="mt-16">
							<span
								@click="removeAttribute(i)"
								class="
									items-center
									justify-center
									top-6
									right-0
									flex
									dark:bg-red-600
									bg-red-400
									dark-hover:bg-red-700
									hover:bg-red-500
									dark:text-gray-900
									text-gray-100
									h-8
									w-8
									rounded-lg
									cursor-pointer
									absolute
									fas
									fa-times
								"
							></span
						></MoeTooltip>
						<label>
							<span>New Attribute</span>
							<input
								v-autofocus
								v-model="attributes[i]"
								type="text"
								class="block rounded-lg border text-gray-900 bg-gray-300 focus:outline-none mb-8 w-80 h-8"
							/>
						</label>
					</div>
					<div class="flex justify-center">
						<MoeTooltip text="New Attribute" class="mb-8" position="top">
							<MoeButtonDark @click.native.prevent="attributes.push('')" icon="fas fa-plus" class="py-2 w-48" />
						</MoeTooltip>
					</div>
				</div>
			</form>
		</div>

		<MoeButtonDark
			@click.native.prevent="attributes.length !== 0 ? addAttributes() : undefined"
			:class="{ 'cursor-not-allowed': attributes.length === 0 }"
			class="m-auto"
			>Add all Attributes</MoeButtonDark
		>
		<div
			@click="$vxm.main.deactivateModal()"
			class="
				items-center
				justify-center
				top-1
				right-1
				flex
				dark:bg-red-600
				bg-red-400
				dark-hover:bg-red-700
				hover:bg-red-500
				dark:text-gray-900
				text-gray-100
				h-6
				w-6
				rounded-2xl
				cursor-pointer
				absolute
			"
		>
			<div class="fas fa-times"></div>
		</div>
	</div>
</template>

<script lang="ts">
	import { Component, Vue } from "nuxt-property-decorator";
	@Component({
		components: {},
		name: "MoeAttributes",
	})
	export default class MoeAttributes extends Vue {
		attributes = [""];
		selectedCharacters: Array<string> = [];

		get characters() {
			return this.$vxm.main.listStore.list.characters;
		}

		addAttributes() {
			const elements = this.$refs.characters as Element[];
			elements.forEach((element) => {
				if ((element.firstElementChild as HTMLInputElement).checked) {
					this.selectedCharacters.push(element.id);
				}
			});
			this.$vxm.main.listStore.addAttributesToCharacters({ attributes: this.attributes, characters: this.selectedCharacters });
			this.$vxm.main.deactivateModal();
		}

		removeAttribute(index: number) {
			this.attributes.splice(index, 1);
		}
	}
</script>
