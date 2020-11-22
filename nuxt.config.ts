import { NuxtConfig } from "@nuxt/types";
import { NuxtOptionsLoaders, NuxtWebpackEnv } from "@nuxt/types/config/build";
import { Configuration as WebpackConfiguration } from "webpack";

const nuxtConfig: NuxtConfig = {
	target: "server",
	title: "Character List Manager",
	head: {
		meta: [
			{ charset: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, scale=1",
			},
			{
				name: "theme-color",
				content: "black",
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
	loading: { color: "#02fdff" },
	plugins: [],
	buildModules: ["@nuxt/typescript-build", "@nuxtjs/stylelint-module", "nuxt-typed-vuex"],
	modules: ["nuxt-buefy", "@nuxtjs/axios", "@nuxtjs/pwa", "@nuxtjs/proxy", "nuxt-winston-log", "@nuxtjs/device"],
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
	axios: {
		baseURL: process.env.NODE_ENV === "production" ? "https://ithambar.moe" : "http://localhost:3000",
	},
	serverMiddleware: [
		{ path: "/loadCollection", handler: "../api/loadCollection.ts" },
		{ path: "/saveCollection", handler: "../api/saveCollection.ts" },
	],
	router: {
		middleware: "mobileRedirect",
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
