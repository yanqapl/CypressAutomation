const { defineConfig } = require("cypress");
const preprocessor = require("@badeball/cypress-cucumber-preprocessor");
const browserify = require("@badeball/cypress-cucumber-preprocessor/browserify");
const sqlServer = require('cypress-sql-server');
const excelToJson = require('convert-excel-to-json');
const fs = require('fs');

async function setupNodeEvents(on, config) {

  config.db = {
    userName: "*********",
    password: "*********",
    server: "yanqademo.database.windows.net",
    options: {
        database: "yanqademo",
        encrypt: true,
        rowCollectionOnRequestCompletion: true
    }
  }

  tasks = sqlServer.loadDBPlugin(config.db);
  on('task', tasks);
  
  // This is required for the preprocessor to be able to generate JSON reports after each run, and more,
  await preprocessor.addCucumberPreprocessorPlugin(on, config)

  on("file:preprocessor", browserify.default(config));
  // Make sure to return the config object as it might have been modified by the plugin.

  on('task',{

    excelToJsonConverter(filePath)
    {
      const result = excelToJson({
      source: fs.readFileSync(filePath)
      });
      return result;
    }

  })

  return config;
}
module.exports = defineConfig({

  defaultCommandTimeout: 6000,
  pageLoadTimeout: 10000,
  env: {
    url: "https://rahulshettyacademy.com"      /////// start java -jar jenkins.war -httpPort=5040 ///go to http://localhost:8080/ 
  },                                            /////// login- admin; pass- ac3ae5c284194c5ab5fcda855cf2eb43
  retries: {
    runMode: 1,
  },
  projectId: "39xcdx",

  e2e: {
    setupNodeEvents,
    specPattern: 'cypress/integration/examples/*.js'
    //specPattern: 'cypress/integration/examples/BDD/*.feature'
  },
});

//json file ->html
