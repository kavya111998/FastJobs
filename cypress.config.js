const { defineConfig } = require("cypress");
const { queryTestDb } = require("./db");
const allureWriter = require('@shelex/cypress-allure-plugin/writer');

module.exports = defineConfig({
  projectId: "2fvt3x",
  responseTimeout: 30000,
  requestTimeout: 30000,
  pageLoadTimeout: 60000,
  defaultCommandTimeout: 60000,
  chromeWebSecurity: false,
  watchForFileChanges: false,
  numTestsKeptInMemory: 50,
  screenshotsFolder: "cypress/screenshots",
  reporter: "cypress-mochawesome-reporter",
  reporterOptions: {
    reportDir: "cypress/reports",
    overwrite: false,
    html: false,
    json: true,
  },
  e2e: {
    setupNodeEvents(on, config) {
      allureWriter(on, config);
      require("cypress-mochawesome-reporter/plugin")(on);
      on("task", {
        queryDb: (query) => {
          return queryTestDb(query, config);
        },
      });
      return config;
    },
    baseUrl: "https://employer-test.fastjobs.my/site/login",
    viewportWidth: 1920,
    viewportHeight: 1080,
  },
  env: {
    employerSG: "https://employer-test.fastjobs.sg/site/login",
    employerMainSG: "https://employer-test.fastjobs.sg/",
    adminMY: "https://admin-test.fastjobs.my/",
    adminSG: "https://admin-test.fastjobs.sg/",
    adminUsernameMY: "admin@fastjobs.sg",
    adminPassMY: "123qwerty88",
    adminUserSG: "scrumfastjobs@gmail.com",
    adminPassSG: "password",
    de_username: "fastco.qa1@fastco.asia",
    de_password: "Password123!",
    pl_username: "fastco.qa2@fastco.asia",
    pl_password: "Password123!",
    ra_username: "kimjaylut.a@fastco.asia",
    ra_password: "Password123",
    outlet_username: "kim.jayluta@fastco.asia",
    outlet_password: "Password123",
    SG_DE_Username: "fastco.qa1@fastco.asia",
    SG_DE_Password: "Password123!",
    // SG_DE_Username: "kimjay.luta@fastjobs.ph",
    // SG_DE_Password: "Password123",
    manageApplicantUsername: "repear.leaf@gmail.com",
    manageApplicantPassword: "Password1234",
    // API_KEY: "b0f595d5e170f4e4bcaf2eee55cbb4e4aad34a473ed1e5d2c9170b64d048c2d8",
  },
});
