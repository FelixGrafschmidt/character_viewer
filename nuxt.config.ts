import { NuxtConfig } from "@nuxt/types";
import { NuxtOptionsLoaders, NuxtWebpackEnv } from "@nuxt/types/config/build";
import { Configuration as WebpackConfiguration } from "@nuxt/types/node_modules/@types/webpack";

const polyfillUrl =
	"https://polyfill.io/v3/polyfill.min.js?features=Array.from,Array.isArray,Array.prototype.entries,Array.prototype.every,Array.prototype.fill,Array.prototype.filter,Array.prototype.find,Array.prototype.findIndex,Array.prototype.forEach,Array.prototype.includes,Array.prototype.indexOf,Array.prototype.keys,Array.prototype.lastIndexOf,Array.prototype.map,Array.prototype.reduce,Array.prototype.some,Array.prototype.sort,ArrayBuffer,Blob,console,DataView,Date.now,Date.prototype.toISOString,document,Function.prototype.bind,IntersectionObserver,Intl,JSON,localStorage,Map,Math.sign,modernizr:es5object,MutationObserver,Number.isInteger,Number.isNaN,Object.assign,Object.entries,Object.freeze,Object.getOwnPropertyDescriptors,Object.getOwnPropertySymbols,Object.is,Object.isExtensible,Object.isFrozen,Object.preventExtensions,Object.setPrototypeOf,Promise,Promise.prototype.finally,Reflect,Reflect.construct,Reflect.ownKeys,RegExp.prototype.flags,ResizeObserver,Set,String.prototype.includes,String.prototype.repeat,String.prototype.startsWith,String.prototype.trim,Symbol,Symbol.for,Symbol.iterator,Symbol.prototype.description,Symbol.toStringTag,Uint8Array,URL,URLSearchParams,WeakMap,WeakSet,XMLHttpRequest";

const nuxtConfig: NuxtConfig = {
	target: "server",
	title: "Character List Manager",
	head: {
		meta: [
			{ charset: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1.0",
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
			{ rel: "theme-color", content: "#ffffff", property: "" },
			{ rel: "msapplication-TileColor", content: "#00aba9", property: "" },
			{ rel: "msapplication-TileImage", content: "/mstile-144x144.png", property: "" },
			{ rel: "mask-icon", href: "/safari-pinned-tab.svg", color: "#5bbad5", property: "", content: "" },
		],
		link: [
			{ rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
			{ rel: "icon", sizes: "16x16", type: "image/png", href: "/favicon-16x16.png" },
			{ rel: "icon", sizes: "32x32", type: "image/png", href: "/favicon-32x32.png" },
			{
				rel: "stylesheet",
				href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.2/css/all.min.css",
				integrity: "sha512-HK5fgLBL+xu6dm/Ii3z4xhlSUyZgTT9tuc/hSrtw6uzJOvgRr2a9jyxxT1ely+B+xFAmJKVSTbpM/CuL7qxO8w==",
				crossorigin: "anonymous",
			},
			{ rel: "manifest", href: "/site.webmanifest" },
		],
		script: [
			{
				crossOrigin: "anonymous",
				src: polyfillUrl,
			},
		],
		title: "Character List Manager",
	},
	loading: { color: "#2f847c" },
	plugins: ["~/plugins/vue-autofocus"],
	buildModules: [
		"@nuxt/typescript-build",
		"@nuxtjs/stylelint-module",
		"nuxt-typed-vuex",
		"@nuxtjs/device",
		"@nuxtjs/tailwindcss",
		// "nuxt-windicss",
		"@nuxtjs/color-mode",
		// "nuxt-vite",
	],
	modules: ["@nuxtjs/axios", "@nuxtjs/pwa", "@nuxtjs/proxy", "nuxt-winston-log", "@nuxtjs/device"],
	build: {
		extend(
			config: WebpackConfiguration,
			ctx: {
				loaders: NuxtOptionsLoaders;
			} & NuxtWebpackEnv
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
	components: [
		"~/components",
		"~/components/collection",
		"~/components/mobile",
		"~/components/frame",
		"~/components/frame/header",
		"~/components/frame/footer",
		"~/components/modal",
		"~/components/common",
	],
	winstonLog: {
		transportOptions: {
			eol: "\n",
			maxsize: 5242880,
			maxFiles: 10,
			timestamp: true,
		},
	},
	purgeCSS: {
		whitelist: ["dark-mode"],
	},
	tailwindcss: {
		jit: true,
		exposeConfig: true,
	},
	pwa: {
		workbox: {
			enabled: false,
		},
	},
	colorMode: {
		classSuffix: "",
		fallback: "dark",
	},
	// vite: {
	// 	build: {
	// 		rollupOptions: {
	// 			external: [
	// 			],
	// 		},
	// 	},
	// },
};

export default nuxtConfig;
