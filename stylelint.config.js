module.exports = {
	// add your custom config here
	// https://stylelint.io/user-guide/configuration
	rules: {
		"selector-pseudo-element-no-unknown": [
			true,
			{
				ignorePseudoElements: ["v-deep"],
			},
		],
	},
	// extends: "stylelint-config-recommended",
};
