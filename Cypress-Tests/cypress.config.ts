import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://dummyjson.com/products",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    specPattern: ["cypress/e2e/dummyjsonAPI/*"],
  },

  env: {
    API_HOST: "http://dummyjson.com/products",
  },
});
