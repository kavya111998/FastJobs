import UpgradePlan from "../../../pages/MY/UpgradePlanPage/CheckoutPage";

describe("Upgrade Plan", () => {
	Cypress.on("uncaught:exception", (err, runnable) => {
		console.log(err);
		return false;
	});

	beforeEach(() => {
		cy.checkWebsiteAvailability("/");
		cy.pageVisit("/");
		cy.employerLogin(Cypress.env("de_username"), Cypress.env("de_password"))
	});

	it("Verify checkout required fields", () => {
		UpgradePlan.ClickUpgradePlanLink();
		UpgradePlan.SelectPackage();
		UpgradePlan.SubmitCheckoutFormEmpty();
	});

	it("Verify error message with invalid inputs", () => {
		UpgradePlan.ClickUpgradePlanLink();
		UpgradePlan.SelectPackage();
		UpgradePlan.SubmitInvalidDetails();
	});

	it("2C2P Checkout | Verify unable to Upgrage plan when there are invalid card details", () => {
		UpgradePlan.ClickUpgradePlanLink();
		UpgradePlan.SelectPackage();
		UpgradePlan.ClickConfirmAndPayButton();
		UpgradePlan.CheckoutWithInvalidDetails();
	});

	it("2C2P Checkout | Verify able to Upgrage plan with valid Card details", () => {
		UpgradePlan.ClickUpgradePlanLink();
		UpgradePlan.SelectPackage();
		UpgradePlan.ClickConfirmAndPayButton();
		UpgradePlan.CheckoutWithValidDetails();
	});
});
