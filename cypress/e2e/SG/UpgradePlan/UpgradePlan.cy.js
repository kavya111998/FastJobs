import UpgradePlan from "../../../pages/SG/UpgradePlanPage/UpgradePlanPage";

describe("Upgrade Plan", () => {
	Cypress.on("uncaught:exception", (err, runnable) => {
		console.log(err);
		return false;
	});

	beforeEach(() => {
		cy.pageVisit(Cypress.env("employerSG"));
		cy.employerLogin(Cypress.env("SG_DE_Username"), Cypress.env("SG_DE_Password"))
	});

	it("Upgrade plan and Download the invoice without error", () => {
		UpgradePlan.ClickUpgradePlanLink();
		UpgradePlan.SelectPackage();
		UpgradePlan.SubmitBillingInformation();
		UpgradePlan.SubmitPaymentWithValidDetails();
		UpgradePlan.ClickDownloadInvoice();
	});
});
