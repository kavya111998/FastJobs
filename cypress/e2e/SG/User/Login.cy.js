import LoginPage from "../../../pages/SG/User/LoginPage";

describe("SG Login", () => {
	Cypress.on("uncaught:exception", (err, runnable) => {
		console.log(err);
		return false;
	});

	beforeEach(() => {
		cy.pageVisit(Cypress.env("employerSG"));
	});

	it("Visit employer SG", () => {
		LoginPage.loginEmployer(
			Cypress.env("SG_DE_Username"),
			Cypress.env("SG_DE_Password")
		);
	});
});
