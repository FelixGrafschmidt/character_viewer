<template>
	<div>
		<i18n path="pages.index.start" tag="h3" class="py-2">
			<template #NEWLIST>
				<a @click="newList" class="dark-hover:text-blue-300 hover:text-blue-700 text-blue-500 cursor-pointer">
					{{ $t("pages.index.list") }}
				</a>
			</template>
		</i18n>
	</div>
</template>

<script lang="ts">
	import { Component, Vue } from "nuxt-property-decorator";

	@Component({
		components: {},
		name: "MoeTutorial1",
	})
	export default class MoeTutorial1 extends Vue {
		newList() {
			this.$vxm.main.deactivateModal();
			this.$router.push(this.$vxm.main.navigationPaths.collection);
		}
	}
</script>
