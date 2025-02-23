import JobPostPage from "../../../pages/MY/ManageJobPage/JobPostPage";
import ManageApplicant from "../../../pages/MY/ManageJobPage/ManageApplicants";

describe.skip("Manage Applicants", () => {
	Cypress.on("uncaught:exception", (err, runnable) => {
		console.log(err);
		return false;
	});

	beforeEach(() => {
		cy.checkWebsiteAvailability("/");
		cy.pageVisit("/");
		cy.employerLogin(Cypress.env("de_username"), Cypress.env("de_password"));
	});

	it("Moves the Jobseeker to each folders (Rejected, KIV, Hire, Shortlisted)", () => {
		JobPostPage.GoToJobListing();
		JobPostPage.searchForJob('chef');
		ManageApplicant.GoToManageApplicant();

		// Shortlisted to Rejected
		ManageApplicant.MoveApplicantToRejected();
		ManageApplicant.verifyMoveSuccessMessage();

		// Rejected to KIV
		ManageApplicant.MoveApplicantToKIV();
		ManageApplicant.verifyMoveSuccessMessage();
		cy.wait(1000);

		// Kiv to Hire
		ManageApplicant.MoveApplicantToHire();
		ManageApplicant.verifyMoveSuccessMessage();
		cy.wait(1000);

		// Hire to Shortlisted
		ManageApplicant.MoveApplicantToShortlisted();
		ManageApplicant.verifyMoveSuccessMessage();
		cy.wait(1000);
	});
});
