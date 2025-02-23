import SGJobPostPage from "../../../pages/SG/ManageJobsPage/SGJobPostPage";

describe('Bump Job ads', () => {
    Cypress.on("uncaught:exception", (err, runnable) => {
		console.log(err);
		return false;
	});

    beforeEach(() => {
		const employerUrlSG = Cypress.env("employerSG");
		cy.checkWebsiteAvailability(employerUrlSG);
		cy.pageVisit(employerUrlSG);
        cy.employerLogin("h.y.a.nuarsph@gmail.com", "Password123");
        //cy.employerSessionLogin("h.y.a.nuarsph@gmail.com", "Password123",employerUrlSG)
		//cy.employerLogin(Cypress.env("h.y.a.nuarsph@gmail.com"), Cypress.env("Password123"));
        cy.selectCompany();
		SGJobPostPage.VerifyJobPostingFeedbackModal();
		SGJobPostPage.GoToJobListing();
	});

    it('Individual Bump', () => {
        SGJobPostPage.bumpJobsIndivisually();
    })

    it('Bulkbump the Job posts', () => {
        SGJobPostPage.navigateToBulkBumpPage();
        SGJobPostPage.verifyBulkBumpPageView();
        SGJobPostPage.bumpSelectedJobs();
        SGJobPostPage.confirmBump();
        SGJobPostPage.bumpSelectedJobs();
        SGJobPostPage.verifyErrorMessageForDuplicateBumps();
    })
})