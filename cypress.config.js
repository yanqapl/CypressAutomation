const { defineConfig } = require("cypress");

module.exports = defineConfig({

  defaultCommandTimeout: 6000,
  pageLoadTimeout: 10000,
  env:{
    url : "https://rahulshettyacademy.com"      /////// start java -jar jenkins.war -httpPort=5040 ///go to http://localhost:8080/ 
  },                                            /////// login- admin; pass- ac3ae5c284194c5ab5fcda855cf2eb43
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
