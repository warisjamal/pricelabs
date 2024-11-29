const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      require('cypress-mochawesome-reporter/plugin')(on);
    },
    baseUrl: "https://pricelabs.co/signin",
    specPattern: "cypress/e2e/**spec.js",
    viewportWidth: 1680,
    viewportHeight: 1050,
    pageLoadTimeout: 100000,
    requestTimeout: 100000,
    chromeWebSecurity: false,
  },
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    charts: true,
    reportPageTitle: 'custom-title',
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
  },
});

