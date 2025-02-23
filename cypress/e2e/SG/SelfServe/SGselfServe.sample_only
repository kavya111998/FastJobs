/// <reference types="cypress" />
import LoginPage from "../../../pages/SG/User/LoginPage";
import SGJobPostPage from "../../../pages/SG/ManageJobsPage/SGJobPostPage";
import companyProfilePage from "../../../pages/SG/Settings/companyProfilePageSG";

describe("SG Job Posting", () => {
	Cypress.on("uncaught:exception", (err, runnable) => {
		console.log(err);
		return false;
	});

	beforeEach(() => {
		const employerSGUrl = Cypress.env("employerMainSG");
		cy.checkWebsiteAvailability(employerSGUrl);
		cy.visit(`${employerSGUrl}/site/pricing`);
	});

	it.skip("Verify able to Complete the Self serve process", () => {
		cy.get(":nth-child(1) > .pricing-info > .sc-fast-button-h > .button").click();
		cy.get("#signupform-fullname").should("be.visible");
		cy.get("#signupform-mobileno").should("be.visible");
		cy.get("#signupform-email").should("be.visible");
		cy.get("#password-input").should("be.visible");
		cy.get("#confirm-password-input").should("be.visible");
		cy.get('[style="width: 304px; height: 78px;"] > div > iframe').should("be.visible");
		cy.get(".col-sm-3 > .btn").contains("Next").should("be.visible");

		cy.get('[style="width: 304px; height: 78px;"] > div > iframe').click();
	});
});
