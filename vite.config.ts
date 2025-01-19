import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: "src/index.ts", // Path to your library's entry point
      name: "TypeCheck", // Global variable for UMD build
      fileName: (format) => `type-check.${format}.js`,
      formats: ["es", "cjs"], // Generate ESM and CommonJS bundles
    },
    rollupOptions: {
      // Externalize dependencies
      external: [], // Specify external dependencies here
      output: {
        globals: {},
      },
    },
  },
});
