import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, "index.html"),
        calendar: resolve(__dirname, "src/pages/calendar/calendar.html"),
        settings: resolve(__dirname, "src/pages/settings/settings.html"),
      },
    },
  },
});
