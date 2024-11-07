const { defineConfig } = require('cypress');

module.exports = defineConfig({
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'cypress/reports',
    overwrite: false,
    html: true,
    json: true,
  },
  env: {
    MAILSLURP_API_KEY: "3f5ecb0e94fcb3284469cc4b6974f4d3ad9fb70952a27205134090ea77fb3e9a"
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here if needed
    },
  },
});
