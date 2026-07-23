import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
    root: "src",
    base: "./",
    clearScreen: false,
    server: { https: false },
    plugins: [

    ],
    build: {
        outDir: "../dist/Approxim",
        manifest: true
    }
});
