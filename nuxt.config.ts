import { NuxtConfig } from "@nuxt/types";
import { NuxtOptionsLoaders, NuxtWebpackEnv } from "@nuxt/types/config/build";
import { Configuration as WebpackConfiguration } from "webpack";

const nuxtConfig: NuxtConfig = {
	target: "server",
	title: "Character List Manager",
	/*
	 ** Headers of the page
	 */
	head: {
		meta: [
			{ charset: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial- scale=1",
			},
			{
				hid: "description",
				name: "description",
				content: process.env.npm_package_description || "",
			},

			{ rel: "them-color", content: "#ffffff", property: "" },
			{ rel: "msapplication-TileColor", content: "#00aba9", property: "" },
			{ rel: "msapplication-TileImage", content: "/mstile-144x144.png", property: "" },
			{ rel: "mask-icon", href: "/safari-pinned-tab.svg", color: "#5bbad5", property: "", content: "" },
		],
		link: [
			{ rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
			{ rel: "icon", sizes: "16x16", type: "image/png", href: "/favicon-16x16.png" },
			{ rel: "icon", sizes: "32x32", type: "image/png", href: "/favicon-32x32.png" },
			{ rel: "manifest", href: "/site.webmanifest" },
		],
		title: "Character List Manager",
	},
	/*
	 ** Customize the progress-bar color
	 */
	loading: { color: "#fff" },
	/*
	 ** Global CSS
	 */
	// css: ["@/assets/styles.scss"],
	/*
	 ** Plugins to load before mounting the App
	 */
	plugins: [],
	/*
	 ** Nuxt.js dev-modules
	 */
	buildModules: [
		"@nuxt/typescript-build",
		// Doc: https://github.com/nuxt-community/stylelint-module
		"@nuxtjs/stylelint-module",
		"nuxt-typed-vuex",
	],
	/*
	 ** Nuxt.js modules
	 */
	modules: [
		// Doc: https://buefy.github.io/#/documentation
		"nuxt-buefy",
		// Doc: https://axios.nuxtjs.org/usage
		"@nuxtjs/axios",
		"@nuxtjs/pwa",
		// Doc: https://github.com/nuxt-community/dotenv-module
		"@nuxtjs/dotenv",
		"@nuxtjs/proxy",
		"nuxt-winston-log",
		// "nuxt-i18n",
	],
	/*
	 ** Axios module configuration
	 ** See https://axios.nuxtjs.org/options
	 */
	axios: {
		proxy: true,
	},
	proxy: {
		"/api/": { target: process.env.BASE_URL || "http://localhost:3000" },
	},
	// i18n: {
	// 	locales: [
	// 		{ code: "en", file: "en.json" },
	// 		{ code: "de", file: "de.json" },
	// 	],
	// 	strategy: "prefix",
	// 	defaultLocale: "en",
	// 	langDir: "i18n/",
	// 	lazy: true,
	// 	vueI18n: {
	// 		fallbackLocale: "en",
	// 	},
	// },
	/*
	 ** Build configuration
	 */
	build: {
		extend(
			config: WebpackConfiguration,
			ctx: {
				loaders: NuxtOptionsLoaders;
			} & NuxtWebpackEnv,
		) {
			if (ctx.isDev) {
				config.devtool = ctx.isClient ? "source-map" : "inline-source-map";
			}
		},
	},
	dotenv: {
		filename: process.env.NODE_ENV === "production" ? "prod.env" : "dev.env",
	},
	serverMiddleware: [
		{ path: "/loadCollection", handler: "~/api/loadCollection.ts" },
		{ path: "/saveCollection", handler: "~/api/saveCollection.ts" },
	],
	server: {
		host: "0.0.0.0",
		port: 3000,
	},
	winstonLog: {
		transportOptions: {
			eol: "\n",
			maxsize: 5242880,
			maxFiles: 10,
			timestamp: true,
		},
	},
};

export default nuxtConfig;
