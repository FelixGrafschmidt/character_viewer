<template>
	<form
		@click.stop
		@submit.prevent="json !== '' ? importList() : undefined"
		class="
			rounded-2xl
			dark:bg-gray-800
			bg-gray-400
			dark:text-gray-100
			text-gray-900
			flex flex-col
			relative
			m-auto
			pb-10
			pt-5
			max-h-[80vh]
			w-[40vw]
			items-center
		"
	>
		<label class="mx-12">
			<span>{{ $t("modals.import_list.title") }}</span>
			<textarea
				v-autofocus
				@input="parseJSONInput"
				type="text"
				class="block rounded-lg border text-gray-900 bg-gray-300 focus:outline-none mb-8 w-80"
			/>
		</label>
		<p v-if="json !== '' && !valid" class="text-red-600">{{ $t("modals.import_list.invalid") }}</p>
		<MoeButtonDark :class="{ 'cursor-not-allowed': json === '' || valid === undefined }" class="m-auto">
			{{ $t("list.import") }}
		</MoeButtonDark>
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
	</form>
</template>

<script lang="ts">
	import { Component, Vue } from "nuxt-property-decorator";
	import { fixImportListJSON } from "@/utils/json";
	import { v4 } from "uuid";
	import { List, newList } from "~/models/interfaces/List";

	@Component({
		components: {},
		name: "MoeImportList",
	})
	export default class MoeImportList extends Vue {
		json = "";
		list: List = newList();
		valid: Boolean | undefined = undefined;

		importList() {
			this.list.characters.forEach((character) => {
				if (!character.images) {
					character.images = [];
				}
			});
			if (this.list.characters.length > 500) {
				window.alert("Too many characters!");
				return;
			}
			if (!this.list.id.match(/\b[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}\b/)) {
				this.list.id = v4();
			}
			const oldList = this.$vxm.main.collectionStore.collection.lists.filter((list) => list.id === this.list.id)[0];
			if (oldList) {
				if (
					!window.confirm(
						`A list with this id already exists. It contains ${oldList.characters.length} characters. Do you want to override this list?`
					)
				) {
					return;
				} else {
					this.$vxm.main.collectionStore.removeListFromCollection(this.list.id);
				}
			}
			this.$vxm.main.collectionStore.addListToCollection(this.list);
			this.$vxm.main.deactivateModal();
		}

		parseJSONInput(event: InputEvent) {
			try {
				this.json = (event.target as HTMLInputElement).value;
				this.list = JSON.parse(this.json, fixImportListJSON);
				this.list.characters.forEach((character) => {
					if (!character.id) {
						character.id = v4();
					}
					if (!character.created) {
						character.created = new Date();
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
