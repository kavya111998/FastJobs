const Chance = require('chance'); 
const chance = new Chance();
import SGJobPostPage from "../../../pages/SG/ManageJobsPage/SGJobPostPage";

let jobData;

describe("SG Job Posting", () => {
	const AccountType = "outlet";

	Cypress.on("uncaught:exception", (err, runnable) => {
		console.log(err);
		return false;
	});

	beforeEach(() => {
		jobData = {
            jobTitle: chance.profession(),
            jobDesc: chance.sentence({ words: 12 }) + " " + 'Updated',
            applyByEmail: chance.email(),
            applyByCallSms: '85556278',
            editedJobTitle: chance.profession() + " " + 'Updated',
        };
		const employerUrlSG = Cypress.env("employerSG");
		cy.checkWebsiteAvailability(employerUrlSG);
		cy.pageVisit(employerUrlSG);
		cy.employerLogin(Cypress.env("outlet_username"), Cypress.env("outlet_password"));
		SGJobPostPage.VerifyJobPostingFeedbackModal();
		SGJobPostPage.GoToJobListing();

	});

	afterEach(() => {
		//Expire the job after each testcase
		cy.log('Expire Job')
		SGJobPostPage.VerifyPostedJobAd(jobData)
	})

	it("Verify able to post and edit a Job with outlets selected", () => {

		// Post Job Ad
		const jobType = "Active";

		SGJobPostPage.GotoPostNewJobForm();
		SGJobPostPage.FillPostNewJobForm(jobData , AccountType, false, "","");
		SGJobPostPage.ClickPostNewJobBtn();
		SGJobPostPage.ConfirmSubmit();
		SGJobPostPage.VerifyJobPostingFeedbackModal();

		//Edit the Job
		SGJobPostPage.searchForJob(jobData);
		SGJobPostPage.EditTheJob();
		SGJobPostPage.FillPostNewJobForm(jobData, AccountType, true,"","");
		SGJobPostPage.ClickPostNewJobBtn();
		SGJobPostPage.GoToJobListing();
		SGJobPostPage.VerifyJobListingPage();
	});

	it("Verify schedule job functionality", () => {
		cy.log("Scheduling a job");
		const jobType = "Scheduled";
		SGJobPostPage.GotoPostNewJobForm();
		SGJobPostPage.FillPostNewJobForm(jobData,AccountType,false, jobType,"")
		SGJobPostPage.ClickPostNewJobBtn();
		SGJobPostPage.ConfirmSubmit();
		//SGJobPostPage.VerifySuccessMsg();
		SGJobPostPage.VerifyJobPostingFeedbackModal();

		// Edit the Job
		// SGJobPostPage.searchForJob(jobData);
		// SGJobPostPage.EditTheJob();
		// SGJobPostPage.FillPostNewJobForm(jobData,AccountType,true, jobType)
		// SGJobPostPage.ClickPostNewJobBtn();
		SGJobPostPage.searchForJob(jobData)
		SGJobPostPage.RepostJob();
		SGJobPostPage.GoToJobListing();
		//SGJobPostPage.VerifySuccessMsg();
		SGJobPostPage.VerifyJobListingPage();
	});


	it("Verify error notification appears when submitted a job that was already posted.", () => {
		// Post Job Ad
		const jobType = "Active";

		SGJobPostPage.GotoPostNewJobForm();
		SGJobPostPage.FillPostNewJobForm(jobData, AccountType, false, "","");
		SGJobPostPage.ClickPostNewJobBtn();
		SGJobPostPage.ConfirmSubmit();
		SGJobPostPage.VerifyJobPostingFeedbackModal();

		
		//Navigate to Job listing
		SGJobPostPage.GoToJobListing();
		
		//Search for the job
		SGJobPostPage.searchForJob(jobData);
		//Copy the same job
		SGJobPostPage.CopyTheJob();
		SGJobPostPage.ClickPostNewJobBtn();

		//Duplicate Job Error
		SGJobPostPage.VerifyDuplicateNotification();
		SGJobPostPage.ClickCancelButton();
		//SGJobPostPage.VerifyJobListingPage();
	});
});
