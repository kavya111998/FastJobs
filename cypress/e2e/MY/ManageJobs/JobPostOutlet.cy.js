const Chance = require('chance'); 
const chance = new Chance();
import JobPostPage from "../../../pages/MY/ManageJobPage/JobPostPage";
export let jobData;


describe("Outlet - Job Posting", () => {
	const accountType = "Outlet";
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
		cy.employerLogin(Cypress.env("outlet_username"), Cypress.env("outlet_password"))
		JobPostPage.VerifyJobPostingFeedbackModal();
		JobPostPage.GoToJobListing();
		
		//JobPostPage.VerifyPostedJobAd();
	});

	afterEach(() => {
         //JobPostPage.VerifyJobPostingFeedbackModal();
         JobPostPage.VerifyPostedJobAd(jobData);
     });

	it("Verify able to Post Job ad and edit the job", () => {
		// Post A Job
		const jobType = 'Active'

		JobPostPage.GoToPostNewJobForm();
		JobPostPage.FillPostNewJobForm(false, jobData, jobType, accountType);
		JobPostPage.SelectPackage(2);
		JobPostPage.ClickPostNewJobBtn();
		JobPostPage.ConfirmSubmit();

		//JobPostPage.VerifySuccessMsg();
		JobPostPage.VerifyJobPostingFeedbackModal();
		// Edit the Job
		JobPostPage.searchForJob(jobData);
		JobPostPage.EditTheJob();

		// JobPostPage.EditletPostjobForm(jobInfo);
		JobPostPage.FillPostNewJobForm(true, jobData, jobType, accountType);
		JobPostPage.ClickPostNewJobBtn();
		//JobPostPage.VerifySuccessMsg();
	});

	it("Verify error notification appears when submitted a job that was already posted.", () => {
		// Post A Job
		const jobType = 'Active'

		JobPostPage.GoToPostNewJobForm();
		JobPostPage.FillPostNewJobForm(false, jobData, jobType, accountType);
		JobPostPage.SelectPackage(2);
		JobPostPage.ClickPostNewJobBtn();
		JobPostPage.ConfirmSubmit();
		
		//JobPostPage.VerifySuccessMsg();
		JobPostPage.VerifyJobPostingFeedbackModal();
		// Edit the Job
		JobPostPage.GoToJobListing();
		JobPostPage.searchForJob(jobData);

		// Copy the same job
		JobPostPage.CopyTheJob();
		JobPostPage.ClickPostNewJobBtn();

		//Verify the notification
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
        // JobPostPage.searchForJob(jobData);
        // JobPostPage.EditTheJob();
        // JobPostPage.FillPostNewJobForm(true, jobData , jobType, accountType);
        // JobPostPage.ClickPostNewJobBtn();

        //Repost the job
        JobPostPage.searchForJob(jobData);
        JobPostPage.RepostJob();
    })
});
