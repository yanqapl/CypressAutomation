const { defineConfig } = require("cypress");

module.exports = defineConfig({

  defaultCommandTimeout: 6000,
  pageLoadTimeout: 10000,
  env:{
    url : "https://rahulshettyacademy.com"
  },
  retries: {
    runMode: 1,
    },
  projectId: "39xcdx",
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    specPattern: 'cypress/integration/examples/*.js',

  },
});
