<template>
	<b-navbar>
		<template slot="start">
			<slot name="start"></slot>
		</template>
		<template slot="end">
			<slot name="end"></slot>
		</template>
	</b-navbar>
</template>
<script lang="ts">
	import { Component, Vue } from "nuxt-property-decorator";
	@Component({
		components: {},
	})
	export default class MoeNavigation extends Vue {}
</script>
<!--style lang="scss" scoped></style-->
