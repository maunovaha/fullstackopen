// eslint-disable-next-line
const { defineConfig } = require('cypress');

// eslint-disable-next-line
module.exports = defineConfig({
  e2e: {
    // eslint-disable-next-line
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'http://localhost:3000',
  },
  env: {
    apiUrl: 'http://localhost:3001/api',
  },
});
