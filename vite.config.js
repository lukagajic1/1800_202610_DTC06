// This Vite config file (vite.config.js) tells Rollup (production bundler)
// to treat multiple HTML files as entry points so each becomes its own built page.

import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, "index.html"),
        createEvent: resolve(__dirname, "createEvent.html"),
        edititinerary: resolve(__dirname, "edititinerary.html"),
        eventGeneric: resolve(__dirname, "eventGeneric.html"),
        itinerary: resolve(__dirname, "itinerary.html"),
        login: resolve(__dirname, "login.html"),
        map: resolve(__dirname, "map.html"),
        profile: resolve(__dirname, "profilepage.html"),
      },
    },
  },
});
