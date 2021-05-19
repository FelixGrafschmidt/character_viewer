module.exports = {
	theme: {
		extend: {
			colors: {},
			spacing: {
				72: "18rem",
				84: "21rem",
				96: "24rem",
			},
			outline: {
				blue: ["4px solid #3b82f6", "-8px"],
			},
		},
		// darkSelector: ".dark-mode",
	},
	darkMode: "class",
	variants: {
		backgroundColor: ["dark", "dark-hover", "dark-group-hover", "dark-even", "dark-odd", "hover", "responsive"],
		borderColor: ["dark", "dark-focus", "dark-focus-within", "hover", "responsive"],
		textColor: ["dark", "dark-hover", "dark-active", "hover", "responsive"],
		scrollbar: ["dark"],
	},
	plugins: [
		require("tailwindcss-dark-mode")(),
		require("@tailwindcss/forms"),
		require("tailwind-scrollbar"),
		require("tailwindcss-typography"),
	],
	purge: {
		// enable remove unused CSS only in production
		enabled: process.env.NODE_ENV === "production",
		// any file that may contain the reference of CSS styles by class name.
		content: ["components/**/*.vue", "layouts/**/*.vue", "pages/**/*.vue", "plugins/**/*.js", "nuxt.config.js"],
	},
};
