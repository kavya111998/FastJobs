import "cypress-iframe";
import "cypress-file-upload";
import 'cypress-shadow-dom';

Cypress.Commands.add("sendDeleteRequestDB", () => {
	cy.task("queryDb", `DELETE FROM Persons;`);
});

Cypress.Commands.add("insertDataRequest", () => {
	cy
		.task(
			"queryDb",
			`INSERT INTO Persons (PersonID, FirstName, Address, City) VALUES
        (001, "KIM JAY", "FastJobs Co.", "Kim"),
        (002, "Pam", "House No. 02", "Espoo"),
        (003, "Dwight", "House No. 03", "Lapland"),
        (004, "Michael", "House No. 04", "Vantaa");`
		)
		.then((result) => {
			expect(result.affectedRows).to.equal(4);
		});
});
Cypress.Commands.add("checkWebsiteAvailability", (url) => {
	cy
		.request({
			url: url,
			failOnStatusCode: false, // Prevents automatic Cypress failure; we'll handle it manually
		})
		.then((response) => {
			// Check if the response status code is 200 (OK)
			if (response.status !== 200) {
				// Throw an error to fail the test and stop further execution
				throw new Error(`Website is down with status code: ${response.status}`);
			}
		});
});

Cypress.Commands.add("pageVisit", (url) => {
	cy.visit(url);
});

Cypress.Commands.add('selectCompany', () => {
	cy.wait(500);
	cy.get('body').then(($body) => {
		if ($body.find('div.account-options').length > 0) {
			cy.get('a.stretched-link').first().click({force:true});
			cy.wait(2000)
		} else {
			cy.log('This User does not have multiple companies')
		}
	})
	
})


Cypress.Commands.add('employerLogin', (email , password) => {

	cy.contains('Login').click({force:true});
	cy.get('input[placeholder="Username or email"]',{timeout:30000}).type(email);
	cy.get('input[placeholder="Password"]').type(password)
	cy.get("#login-form > fast-button > button").click({force:true});
		cy.wait(2000);
})

Cypress.Commands.add('employerSessionLogin',(email,password,url)=> {
	cy.session([email, password, url], () => {
		cy.visit(url)
        cy.contains('Login').click({force: true});
        cy.get('#login-form > fast-input > div > div > input', {timeout: 30000}).type(email);
        cy.get('#login-form > div > fast-input > div > div > input').type(password);
        cy.get("#login-form > .sc-fast-button-h > .button").click({force: true});
        cy.wait(2000);
    });
})

Cypress.Commands.add('areYouLookingForJobPopUp', () => {
	cy.get('body').then(($body) => {
		if ($body.find('div.modal-header').length > 0) {
			cy.contains('Stay on FastJobs Employer').click();
		} else {
			cy.log('No pop up shown')
		}
	})

})

// Mail Slurp

// const { MailSlurp } = require("mailslurp-client");
// const apiKey = Cypress.env("API_KEY");
// const mailslurp = new MailSlurp({ apiKey });

// Cypress.Commands.add("createInbox", () => {
// 	return mailslurp.createInbox();
// });

// Cypress.Commands.add("waitForLatestEmail", (inboxId) => {
// 	const timeoutMillis = 30_000;
// 	return mailslurp.waitForLatestEmail(inboxId, timeoutMillis);
// });
