const Chance = require('chance'); 
export const chance = new Chance();
import JobPostPage from "../../../pages/MY/ManageJobPage/JobPostPage";


export let jobData;

describe("SG Job Posting DE", () => {
	const accountType = "recruitmentAgency";

	Cypress.on("uncaught:exception", (err, runnable) => {
		console.log(err);
		return false;
	});

	beforeEach(() => {
		jobData = {
            jobTitle: chance.profession(),
            jobDesc: chance.sentence({ words: 12 }),
            applyByEmail: chance.email(),
            applyByCallSms: '85556278',
            editedJobTitle: chance.profession() + " " + 'Updated',
        };
		cy.checkWebsiteAvailability("/");
        cy.pageVisit("/");
		cy.employerLogin(Cypress.env("ra_username"), Cypress.env("ra_password"));
		JobPostPage.VerifyJobPostingFeedbackModal();
	});

	afterEach(() => {
         //JobPostPage.VerifyJobPostingFeedbackModal();
         JobPostPage.VerifyPostedJobAd(jobData);
     });

	it("Post new job ad and Edit with Agency information included", () => {

		const jobType = 'Active'

		JobPostPage.GoToPostNewJobForm();

		JobPostPage.FillPostNewJobForm(false, jobData, jobType, accountType);
		JobPostPage.SelectPackage(2);

		JobPostPage.ClickPostNewJobBtn();
		JobPostPage.ConfirmSubmit();

		JobPostPage.VerifyJobPostingFeedbackModal();
		
		JobPostPage.GoToJobListing();
		
		JobPostPage.searchForJob(jobData);
		JobPostPage.EditTheJob();
		JobPostPage.FillPostNewJobForm(true, jobData, jobType, accountType);
		JobPostPage.ClickPostNewJobBtn();
	});

	it("Verify error notification appears when submitted a job that was already posted.", () => {
		const jobType = 'Active'
		JobPostPage.GoToPostNewJobForm();
		JobPostPage.FillPostNewJobForm(false, jobData, jobType, accountType);
		JobPostPage.SelectPackage(2);

		JobPostPage.ClickPostNewJobBtn();
		JobPostPage.ConfirmSubmit();

		//JobPostPage.VerifySuccessMsg();
		JobPostPage.VerifyJobPostingFeedbackModal();
		JobPostPage.GoToJobListing();
		
		//search for the job
		JobPostPage.searchForJob(jobData);

		//Copy the same job
		JobPostPage.CopyTheJob();
		JobPostPage.ClickPostNewJobBtn();
		JobPostPage.VerifyDuplicateNotification();
		JobPostPage.ClickCancelButton();
	});

	it('Verify Scheduled Job functionality',() => {
        const jobType = 'Scheduled'
        JobPostPage.GoToPostNewJobForm();
        JobPostPage.FillPostNewJobForm(false, jobData, jobType, accountType);
        JobPostPage.SelectPackage(2);
        JobPostPage.ClickPostNewJobBtn();
        JobPostPage.ConfirmSubmit();
        JobPostPage.VerifyJobPostingFeedbackModal();
        //JobPostPage.VerifySuccessMsg();
        JobPostPage.searchForJob(jobData);
        JobPostPage.EditTheJob();
        JobPostPage.FillPostNewJobForm(true, jobData , jobType, accountType);
        JobPostPage.ClickPostNewJobBtn();

        //Repost the job
        JobPostPage.searchForJob(jobData);
        JobPostPage.RepostJob();
    })
});