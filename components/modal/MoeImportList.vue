<template>
	<form
		class="
			rounded-2xl
			dark:bg-gray-700
			bg-gray-400
			dark:text-gray-100
			text-gray-900
			flex flex-col
			relative
			m-auto
			pb-10
			pt-5
			z-20
			max-h-[80vh]
			w-[40vw]
			items-center
		"
		@submit.prevent="json !== '' ? importList() : undefined"
	>
		<label class="mx-12">
			<span>Paste the content of your exported list below.</span>
			<textarea
				v-autofocus
				type="text"
				class="block rounded-lg border text-gray-900 bg-gray-300 focus:outline-none mb-8 w-80"
				@input="parseJSONInput"
			/>
		</label>
		<p v-if="json !== '' && !valid" class="text-red-600">Invalid file</p>
		<MoeButton text="Import List" :class="{ 'cursor-not-allowed': json === '' || valid === undefined }" class="m-auto" />
		<div
			class="
				top-1
				right-1
				dark:bg-red-500
				dark:text-gray-900
				bg-red-800
				text-gray-100
				h-6
				w-6
				text-center
				rounded-2xl
				ml-24
				cursor-pointer
				absolute
			"
			@click="$accessor.deactivateModal()"
		>
			X
		</div>
	</form>
</template>

<script lang="ts">
	import { Component, Vue } from "nuxt-property-decorator";
	import { fixImportListJSON } from "@/utils/json";
	import { v4 } from "uuid";
	import { List } from "~/models/interfaces/List";

	@Component({
		components: {},
		name: "MoeImportList",
	})
	export default class MoeImportList extends Vue {
		json = "";
		list: List = { id: "", name: "", characters: [] };
		valid: Boolean | undefined = undefined;

		importList() {
			this.list.characters.forEach((character) => {
				if (!character.images) {
					character.images = [];
				}
			});
			const oldList = this.$accessor.collection.lists.filter((list) => list.id === this.list.id)[0];
			if (oldList) {
				if (
					!window.confirm(
						`A list with this id already exists. It contains ${oldList.characters.length} characters. Do you want to override this list?`
					)
				) {
					return;
				}
			}
			this.$accessor.addListToCollection(this.list);
			this.$accessor.deactivateModal();
		}

		parseJSONInput(event: InputEvent) {
			try {
				this.json = (event.target as HTMLInputElement).value;
				this.list = JSON.parse(this.json, fixImportListJSON);
				this.list.characters.forEach((character) => {
					if (!character.id) {
						character.id = v4();
					}
				});
				this.valid = true;
			} catch (error) {
				console.error(error);

				this.valid = false;
			}
		}
	}
</script>
