import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "TypeCheck",
      fileName: (format) => `type-check.${format}.js`,
      formats: ["es"],
    },
    emptyOutDir: false,
    rollupOptions: {
      // Externalize dependencies
      external: [], // Specify external dependencies here
      output: {
        // preserveModules: true,
        globals: {},
      },
    },
  },
});
