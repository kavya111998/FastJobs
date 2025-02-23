const Chance = require('chance'); 
const chance = new Chance();
import JobPostPage from '../../../pages/MY/ManageJobPage/JobPostPage'



export let jobData;

describe("Direct Employer - Job Posting", () => {
    const accountType = "directEmployer";
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
        cy.employerLogin(Cypress.env("de_username"), Cypress.env("de_password"));
        cy.selectCompany();
        JobPostPage.verifyWelcomePromptDisplayed();
        JobPostPage.GoToJobListing();
        //JobPostPage.VerifyJobPostingFeedbackModal();
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
        JobPostPage.VerifyJobPostingFeedbackModal();
        //JobPostPage.VerifySuccessMsg();
        
        JobPostPage.GoToJobListing();

        // Edit the Job
        JobPostPage.searchForJob(jobData);
        JobPostPage.EditTheJob();
        JobPostPage.FillPostNewJobForm(true, jobData , jobType, accountType);
        JobPostPage.ClickPostNewJobBtn();
        //JobPostPage.VerifySuccessMsg();
    });

    it("Verify error notification appears when submitted a job that was already posted.", () => {
        const jobType = 'Active'
        JobPostPage.GoToPostNewJobForm();
        JobPostPage.FillPostNewJobForm(false, jobData, jobType, accountType);
        JobPostPage.SelectPackage(2);
        JobPostPage.ClickPostNewJobBtn();
        JobPostPage.ConfirmSubmit();
        JobPostPage.VerifyJobPostingFeedbackModal();
        //JobPostPage.VerifySuccessMsg();

        // Copy the same job
        JobPostPage.GoToJobListing();
		JobPostPage.searchForJob(jobData);
        JobPostPage.CopyTheJob();
        JobPostPage.ClickPostNewJobBtn();

        // Verify the notification
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
