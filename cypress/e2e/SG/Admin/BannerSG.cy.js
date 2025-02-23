import LoginPage from "../../../pages/SG/User/LoginPage";
import BannerPage from "../../../pages/SG/Admin/BannerSGPage";

const Chance = require('chance');
const chance = new Chance();

describe("SG Job Posting", () => {
	Cypress.on("uncaught:exception", (err, runnable) => {
		console.log(err);
		return false;
	});

	beforeEach(() => {
		const adminUrlSG = Cypress.env("adminSG");
		cy.checkWebsiteAvailability(adminUrlSG);
		cy.pageVisit(adminUrlSG);
		LoginPage.adminLoginSG(Cypress.env("adminUserSG"), Cypress.env("adminPassSG"));
	});

	it("Verify able to Create, Update and Delete Banner", () => {
		const bannerData = {
			descrition:
				"Find Your Dream Job Today! 🚀 Explore top opportunities in your field. Apply now and take the next step in your career!",
			buttonText: "Apply Now!",
			title: "Exciting Career Opportunities!",
			url: "AutomatedBanner",
		};

		const actionDelete = 2;
		//Navigate to the Banner form
		BannerPage.navigateToBannerListing();
		BannerPage.navigateToCreateBanner();

		// Verify the form
		BannerPage.verifyBannerFormElement();

		// Fill the form
		BannerPage.fillBannerForm(bannerData, false);
		BannerPage.verifyAlertDisplayed("alert-success");

		// Remove the added Banner
		BannerPage.actionBanner(actionDelete, bannerData.title);
		BannerPage.verifyAlertDisplayed("alert-success");
		
	});
});
