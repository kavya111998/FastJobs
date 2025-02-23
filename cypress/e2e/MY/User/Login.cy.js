import LoginPage from "../../../pages/MY/UserPages/LoginPage";

describe("Login", () => {
	Cypress.on("uncaught:exception", (err, runnable) => {
		console.log(err);
		return false;
	});

	beforeEach(() => {
		cy.checkWebsiteAvailability("/");
		cy.pageVisit("/");
		// cy.sendDeleteRequestDB();
		//cy.insertDataRequest();
	});

	it("Verify successfully login to the Employer page", () => {
		LoginPage.loginEmployer(Cypress.env("de_username"), Cypress.env("de_password"));
	});

	it("Verify unable to login with empty form", () => {
		LoginPage.loginEmployerWithEmptyfields();
	});

	it("Verify nable to login with invalid details", () => {
		LoginPage.loginEmployerWithInvalidCreds("testemail", "123123");
	});
});
