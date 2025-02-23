# fastroster-e2e-test

**How to install**
Clone this repository somewhere on your machine, go into the directory and run **npm install**.

**How to run** 
There are a few ways to run the scripts.

First, you can open the test runner by running **npx cypress open** at the command line to launch a GUI from where you can run individual scripts.

Secondly, you can run **npx cypress run** at the command line to run all script headlessly.

Lastly, if you wanted to run a "specific section of tests" headlessly you can use something like **npx cypress run --spec "cypress/integration/connect/."**. Alternatively, replace the . which the full name of a file to run that test on its own.

You can select which browser engine to use with the commandline parameter -b chrome. sometimes you may have experience problems (crashes) when using electron, so chrome is preferred.

**More info about Cypress.**
To find out more about Cypress visit their site at **http://www.cypress.io/**

**Where to set environment variables**
In **cypress.config.js** file you can change/set baseurl, username and password
