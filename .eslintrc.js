module.exports = {
	root: true,
	env: {
		browser: true,
		node: true,
	},
	extends: ["@nuxtjs/eslint-config-typescript", "prettier", "plugin:prettier/recommended", "plugin:nuxt/recommended"],
	plugins: ["prettier"],
	// add your custom rules here
	rules: {
		"no-console": "off",
		"no-debug": "off",
		"vue/comment-directive": "off",
	},
	ignorePatterns: ["dist/"],
};
