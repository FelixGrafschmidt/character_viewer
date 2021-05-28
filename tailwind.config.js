const darkmode = require("tailwindcss-dark-mode");
const forms = require("@tailwindcss/forms");
const scrollbar = require("tailwind-scrollbar");
const typography = require("tailwindcss-typography");

module.exports = {
	mode: "jit",
	theme: {
		extend: {
			colors: {
				teal: {
					100: "#97ffff",
					200: "#7dffff",
					300: "#33ffff",
					400: "#00cccc",
					500: "#00a3a3",
					600: "#008282",
					700: "#006868",
					800: "#005353",
					900: "#004242",
				},
			},
			spacing: {
				72: "18rem",
				84: "21rem",
				96: "24rem",
			},
			outline: {
				blue: ["4px solid #3b82f6", "-8px"],
			},
		},
		darkSelector: ".dark",
	},
	darkMode: "class",
	variants: {
		backgroundColor: ["dark", "dark-hover", "dark-group-hover", "dark-even", "dark-odd", "hover", "responsive"],
		borderColor: ["dark", "dark-focus", "dark-focus-within", "hover", "responsive"],
		textColor: ["dark", "dark-hover", "dark-active", "hover", "responsive"],
		scrollbar: ["dark", "rounded"],
	},
	plugins: [darkmode(), forms, scrollbar, typography],
	purge: {
		// enable remove unused CSS only in production
		enabled: process.env.NODE_ENV === "production",
		// any file that may contain the reference of CSS styles by class name.
		content: ["components/**/*.vue", "layouts/**/*.vue", "pages/**/*.vue", "plugins/**/*.js", "nuxt.config.ts"],
	},
};
