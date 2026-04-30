import adapterStatic from "@sveltejs/adapter-static";
import { sveltePreprocess } from "svelte-preprocess";
import autoprefixer from "autoprefixer";

const preprocess = sveltePreprocess({
	postcss: {
		plugins: [autoprefixer]
	}
});

const config = {
	compilerOptions: {
		runes: true
	},
	preprocess,
	kit: {
		paths: {
			base: process.env.BASE_PATH || ''
		},
		adapter: adapterStatic({ strict: false }),
		prerender: {
			handleHttpError: ({ path, message }) => {
				if (path.startsWith('/audio/') || path.startsWith('/images/')) return;
				throw new Error(message);
			}
		}
	}
};

export default config;
