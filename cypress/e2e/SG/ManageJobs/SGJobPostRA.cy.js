const Chance = require('chance'); 
const chance = new Chance();
import SGJobPostPage from "../../../pages/SG/ManageJobsPage/SGJobPostPage";

let jobData;

describe("SG Job Posting DE", () => {
	const AccountType = "recruitmentAgency";

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
		cy.employerLogin(Cypress.env("ra_username"), Cypress.env("ra_password"));
		SGJobPostPage.VerifyJobPostingFeedbackModal();
		SGJobPostPage.GoToJobListing();
	});

	afterEach(() => {
		//Expire the job after each testcase
		SGJobPostPage.GoToJobListing();
		cy.log('Expire Job')
		SGJobPostPage.VerifyPostedJobAd(jobData)
	})	

	it("Post new job ad and Edit with Agency information included", () => {
		const jobType = 'Active'

		SGJobPostPage.GotoPostNewJobForm();

		SGJobPostPage.FillPostNewJobForm(jobData,AccountType,false, jobType,"")
		SGJobPostPage.ClickPostNewJobBtn();

		SGJobPostPage.RAClickProceedButton();
		SGJobPostPage.ConfirmSubmit();
		SGJobPostPage.VerifyJobListingPage();
		SGJobPostPage.VerifyJobPostingFeedbackModal();

		//Edit the Job
		SGJobPostPage.searchForJob(jobData);
		
		SGJobPostPage.EditTheJob();
		SGJobPostPage.FillPostNewJobForm(jobData,AccountType,true, jobType,"")

		SGJobPostPage.ClickPostNewJobBtn();
		SGJobPostPage.RAClickProceedButton();

		//Verify error notification appears when submitted a job that was already posted.
		cy.log('Verify error notification appears when submitted a job that was already posted')

		SGJobPostPage.VerifyJobListingPage();
		//search for the job
		SGJobPostPage.searchForJob(jobData);

		//Copy the same job
		SGJobPostPage.CopyTheJob();
		SGJobPostPage.ClickPostNewJobBtn();

		//Duplicate Job Error
		SGJobPostPage.VerifyDuplicateNotification();
		SGJobPostPage.ClickCancelButton();
		
		//Extend Job post
		cy.log('Extend job post')
		SGJobPostPage.GoToJobListing();
		SGJobPostPage.searchForJob(jobData);

		SGJobPostPage.extendJobPost();
	});

	it("Verify schedule job functionality", () => {
		cy.log("Scheduling a job");
		const jobType = "Scheduled";
		SGJobPostPage.GotoPostNewJobForm();
		SGJobPostPage.FillPostNewJobForm(jobData,AccountType,false, jobType,"")
		SGJobPostPage.ClickPostNewJobBtn();
		SGJobPostPage.RAClickProceedButton();
		SGJobPostPage.ConfirmSubmit();
		//SGJobPostPage.VerifySuccessMsg();
		SGJobPostPage.VerifyJobPostingFeedbackModal();

		// Edit the Job
		SGJobPostPage.searchForJob(jobData);
		SGJobPostPage.EditTheJob();
		SGJobPostPage.FillPostNewJobForm(jobData,AccountType,true, jobType,"")
		SGJobPostPage.ClickPostNewJobBtn();
		SGJobPostPage.RAClickProceedButton();
		SGJobPostPage.searchForJob(jobData)
		SGJobPostPage.RepostJob();
		SGJobPostPage.GoToJobListing();
		//SGJobPostPage.VerifySuccessMsg();
		SGJobPostPage.VerifyJobListingPage();
	});

});

describe('Verify Chines Job functionality',()=>{
	const AccountType = "parkingLot";
	
	Cypress.on("uncaught:exception", (err, runnable) => {
		console.log(err);
		return false;
	});
	
	beforeEach(() => {
		jobData = {
			jobTitle: '仓库助理兼司机' + (Math.floor(Math.random() * 900) + 100),
			jobDesc: 
					"关键职责 :我们的工作范围包括但不限于以下内容" +
					"*库存管理（进货/出货/卸货/库存盘点/库存质量保证" +
					"*商品包装和准备发货*本地及出口配送"+
					"*设备维护（卡车/托盘车/叉车/装配设备"+
					"*行政/报告*装配/产品测试"+
					"*仓库安全*仓库和办公室清洁（装卸货后的仓库清理、拖地、清洁厕所等",
			applyByEmail: chance.email(),
			applyByCallSms: '85556278',
			editedJobTitle: function() {
				return this.jobTitle + " " + 'Updated'
			}
		};
		const employerUrlSG = Cypress.env("employerSG");
		cy.checkWebsiteAvailability(employerUrlSG);
		cy.pageVisit(employerUrlSG);
		cy.employerLogin(Cypress.env("ra_username"), Cypress.env("ra_password"));
		SGJobPostPage.VerifyJobPostingFeedbackModal();
		SGJobPostPage.GoToChineseJobListing();
	});
	
	afterEach(() => {
		//Expire the job after each testcase
		SGJobPostPage.GoToChineseJobListing();
		cy.log('Expire Job')
		SGJobPostPage.VerifyPostedJobAd(jobData)
	})
	
	it("Post new job ad and Edit with Agency information included for chinese job", () => {
		const jobType = 'Active'

		SGJobPostPage.GotoPostNewJobForm();

		SGJobPostPage.FillPostNewJobForm(jobData,AccountType,false, jobType,"Chinese")
		SGJobPostPage.ClickPostNewJobBtn();

		SGJobPostPage.RAClickProceedButton();
		SGJobPostPage.ConfirmSubmit();
		//SGJobPostPage.VerifyJobListingPage();
		SGJobPostPage.VerifyJobPostingFeedbackModal();

		//Edit the Job
		SGJobPostPage.searchForJob(jobData);
		
		SGJobPostPage.EditTheJob();
		SGJobPostPage.FillPostNewJobForm(jobData,AccountType,true, jobType,"Chinese")

		SGJobPostPage.ClickPostNewJobBtn();
		SGJobPostPage.RAClickProceedButton();

		//Verify error notification appears when submitted a job that was already posted.
		cy.log('Verify error notification appears when submitted a job that was already posted')

		//search for the job
		SGJobPostPage.searchForJob(jobData);

		//Copy the same job
		SGJobPostPage.CopyTheJob();
		SGJobPostPage.ClickPostNewJobBtn();

		//Duplicate Job Error
		SGJobPostPage.VerifyDuplicateNotificationForChineseJob();
		SGJobPostPage.ClickCancelButton();
	});

	it("Verify schedule job functionality for chinese job", () => {
		cy.log("Scheduling a job");
		const jobType = "Scheduled";
		SGJobPostPage.GotoPostNewJobForm();
		SGJobPostPage.FillPostNewJobForm(jobData,AccountType,false, jobType,"Chinese")
		SGJobPostPage.ClickPostNewJobBtn();
		SGJobPostPage.RAClickProceedButton();
		SGJobPostPage.ConfirmSubmit();
		//SGJobPostPage.VerifySuccessMsg();
		SGJobPostPage.VerifyJobPostingFeedbackModal();

		// Edit the Job
		SGJobPostPage.searchForJob(jobData);
		SGJobPostPage.EditTheJob();
		SGJobPostPage.FillPostNewJobForm(jobData,AccountType,true, jobType,"Chinese")
		SGJobPostPage.ClickPostNewJobBtn();
		SGJobPostPage.RAClickProceedButton();
		SGJobPostPage.searchForJob(jobData)
		SGJobPostPage.RepostJob();
	});
})