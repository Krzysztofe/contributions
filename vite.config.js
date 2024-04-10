import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, "index.html"),
        home: resolve(__dirname, "src/pages/home/home.html"),
        settings: resolve(__dirname, "src/pages/settings/settings.html"),
      },
    },
  },
});
