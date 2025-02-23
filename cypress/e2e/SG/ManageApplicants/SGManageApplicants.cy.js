/// <reference types = "Cypress" />

import LoginPage from "../../../../pages/SG/User/LoginPage";
import SGJobPostPage from "../../../pages/SG/ManageJobsPage/SGJobPostPage";
import SGManageApplicantPage from "../../../pages/SG/ManageJobsPage/SGManageApplicantPage";

describe("SG | Manage Applicants", () => {
	const AccountType = "directEmployer";

	Cypress.on("uncaught:exception", (err, runnable) => {
		console.log(err);
		return false;
	});

	beforeEach(() => {
		const employerUrlSG = Cypress.env("employerSG");
		cy.checkWebsiteAvailability(employerUrlSG);
		cy.pageVisit(employerUrlSG);
		LoginPage.loginEmployer(Cypress.env("SG_DE_Username"), Cypress.env("SG_DE_Password"));
	});

	it.skip("Post a Job and Jobseeker applied to the Job", () => {
		const JobseekerLogin = {
			username: "kimjay.luta@fastjobs.ph",
			password: "Password123",
			userTwo: "lsdka@gmail.com",
			passTwo: "Password123",
		};
		SGJobPostPage.VerifyJobPostingFeedbackModal();
		SGJobPostPage.VerifyPostedJobAd();
		SGJobPostPage.GotoPostNewJobForm();
		SGJobPostPage.FillPostNewJobForm("", AccountType);
		SGJobPostPage.ClickPostNewJobBtn();
		SGJobPostPage.ConfirmSubmit();
		SGJobPostPage.VerifyJobListingPage();
		SGJobPostPage.VerifyJobPostingFeedbackModal();

		// SGJobPostPage.GoToJobListing();
		SGManageApplicantPage.LoginAsJobseeker(JobseekerLogin);
		SGManageApplicantPage.ApplyToTheJob();
	});

	it.skip("Move Jobseeker from New to Shortlisted", () => {
		SGJobPostPage.GoToJobListing();
		SGManageApplicantPage.GoToManageApplicants();
		cy.wait(500);
		SGManageApplicantPage.checkApplicantDataIsReceived();
		SGManageApplicantPage.MoveApplicantToShortlisted();
	});

	it.skip("Move Jobseeker from Shortlisted to Rejected", () => {
		SGJobPostPage.GoToJobListing();
		SGManageApplicantPage.GoToManageApplicants();
		SGManageApplicantPage.MoveApplicantToRejected();
	});

	it.skip("Move Jobseeker from Rejected to KIV", () => {
		SGJobPostPage.GoToJobListing();
		SGManageApplicantPage.GoToManageApplicants();
		SGManageApplicantPage.MoveApplicantToKIV();
	});

	it.skip("Move Jobseeker from KIV to Hire", () => {
		SGJobPostPage.GoToJobListing();
		SGManageApplicantPage.GoToManageApplicants();
		SGManageApplicantPage.MoveApplicantToHire();
	});
});
