import JobPostPage from "../../../pages/MY/ManageJobPage/JobPostPage";
import companyProfilePage from "../../../pages/MY/Settings/companyProfilePageMY";

describe("Update Company profile", () => {
	Cypress.on("uncaught:exception", (err, runnable) => {
		console.log(err);
		return false;
	});

	beforeEach(() => {
		cy.checkWebsiteAvailability("/");
		cy.pageVisit("/");

		//cy.areYouLookingForJobPopUp();

		cy.employerLogin(Cypress.env("de_username"), Cypress.env("de_password"))

		JobPostPage.VerifyJobPostingFeedbackModal();
	});

	it("Verify able to update the Company information", () => {
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
