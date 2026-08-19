import tailwindcss from "@tailwindcss/vite";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";

const config = defineConfig({
	resolve: {
		// resolve the "@/*" path alias from tsconfig.json
		tsconfigPaths: true,
	},
	optimizeDeps: {
		// "bun" is a runtime builtin, so the dev dependency scanner should not try to resolve it
		exclude: ["bun"],
	},
	plugins: [
		// strips TanStack devtools out of production builds, so it must come first
		devtools(),
		tailwindcss(),
		tanstackStart(),
		nitro({
			// Uncomment this to enable Vercel deployment
			// config: {
			// 	vercel: {
			// 		functions: {
			// 			runtime: "bun1.x",
			// 		},
			// 	},
			// },
		}),
		viteReact(),
	],
});

export default config;
