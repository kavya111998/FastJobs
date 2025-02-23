import SGJobPostPage from "../../../pages/SG/ManageJobsPage/SGJobPostPage";
import companyProfilePage from "../../../pages/SG/Settings/companyProfilePageSG";

describe("SG Job Posting", () => {
	const AccountType = "directEmployer";

	Cypress.on("uncaught:exception", (err, runnable) => {
		console.log(err);
		return false;
	});

	beforeEach(() => {
		cy.viewport("macbook-15");
		const employerSGUrl = Cypress.env("employerMainSG");
		cy.checkWebsiteAvailability(employerSGUrl);

		cy.pageVisit(employerSGUrl);
		cy.areYouLookingForJobPopUp();

		cy.employerLogin(Cypress.env("SG_DE_Username"), Cypress.env("SG_DE_Password"))
		SGJobPostPage.VerifyJobPostingFeedbackModal();
	});

	it("Verify able to update the Comapny Information", () => {
		const newCompanyDetails = {
			companyName: "Automation Co. (DE) - Update",
			description: "Automation Testing...",
		};

		const newCompanyAddress = {
			floorNo: 120,
			unitNo: 21,
			streetName: "Anahaw Street",
			building: "Lot 53 Luta Residence",
			postalCode: 4400,
		};

		companyProfilePage.goToSetting();
		companyProfilePage.clickCompanyProfile();
		companyProfilePage.fillCompanyDetails(newCompanyDetails);
		companyProfilePage.fillCompanyAddress(newCompanyAddress);
		companyProfilePage.clickSaveChanges();
		companyProfilePage.verifyUpdateSuccess(newCompanyDetails, newCompanyAddress);
	});
});
