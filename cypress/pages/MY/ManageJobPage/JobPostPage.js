import Chance from 'chance';
const chance = new Chance();

class JobPostPage {
	elements = {
		// Elements not related inside of Posting job form
		ManageJobsNavlink: () =>
			cy.get(".col-sm-12 > .nav > :nth-child(2) > a").first(),
		postNewJobBtn: () => cy.get("[data-event='job_posting_initiated']"),

		// EDIT JOB
		EditJobBtn: () => cy.get('[data-cy="Edit job"]'),

		// Copy elements
		CopyJobBtn: () => cy.get('a[data-cy="Copy job post"]'),

		//Expire elements
		ExpireJobBtn: () => cy.get('a[data-cy="Expire job post"]').first(),
		ConfirmExpireJob: () => cy.get('[data-event="expire_job_confirmed"]'),
			

		//Job form elements
		JobTitle: () => cy.get("#jobTitleInput",{timeout:20000}),

		SalaryFlag: () => cy.get("#salflag-dt > .btn"),
		SalaryFlagDropdown: () => cy.get(":nth-child(2) > .dropdown-sal-flag"),
		Salary: () => cy.get("#maxsals"),
		SalaryPeriod: () => cy.get("#jobSalPeriodDp > .btn"),
		SalaryPeriodDropdown: () => cy.get(":nth-child(4) > .dropdown-sal-period"),

		JobDescription: () => cy.get("div.rx-editor-container"),

		Location: () => cy.get("#jobRegion"),
		SubLocation: () => cy.get("#jobCity"),
		WorkingPlace: () => cy.get("#c9jobs-building"),
		WorkingPlaceSelect: () => cy.get("#ui-id-2"),

		JobCategory: () => cy.get("#c9jobs-category"),
		JobCategoryTwo: () => cy.get("#c9jobs-category2"),

		JobTypePartTime: () => cy.get(":nth-child(1) > .checkbox-box"),
		JobTypeFullTime: () => cy.get(":nth-child(2) > .checkbox-box"),
		JobTypeContracts: () => cy.get(":nth-child(3) > .checkbox-box"),

		Timing: () => cy.get("#c9jobs-timingc"),
		FilterApplicants: () => cy.get("#c9jobs-appfilterflag"),

		ApplyByEmail: () => cy.get("#c9jobs-appdirecteml"),
		ApplyByCallSms: () => cy.get("#c9jobs-appdirectmobn"),
		AppyByWhatsapp: () => cy.get("#c9jobs-appwhatsapp"),

		//Job Form new Elements
		AddWorkLocation: () => cy.get(".actions > .fj-btn"),
		SearchLocation: () => cy.get("#location-search-input"),
		LocationItem: () => cy.get(".location-item"),
		AddWorkAddressBtn: () => cy.contains("Add work address"),

		//Preferences
		EducLevel: () => cy.get("#c9jobs-edulvlc"),
		JobSkills: () =>
			cy.get(
				":nth-child(2) > .col-md-12 > .form-group > .block-grid-xs-1 > :nth-child(1) > .form-control"
			),
		JobLanguage: () =>
			cy.get(
				":nth-child(3) > .col-md-12 > .form-group > .block-grid-xs-1 > :nth-child(1) > .form-control"
			),

		//Cancel & Submit buttons
		CancelBtn: () => cy.get("#btnCancelJobPost"),
		ConfirmCancelBtn: () => cy.get(".iziToast-buttons > .btn-danger"),
		PostNewJobBtn: () => cy.get("#btnSubmitJobPost"),
		ConfirmSubmitJob: () => cy.get("#confirm-btn"),
		BottomSaveAsDraftBtn: () => cy.get(":nth-child(3) > .btn"),

		//Error message element
		NewJobFormRequiredErrMsg: () => cy.get(".help-block"),

		//Package
		PackageType: (packageType) =>
			cy.get(
				`:nth-child(${packageType}) > .col-xs-2 > .control > .control__indicator`
			),

		//Success message
		SuccessMsg: () => cy.get("div.iziToast-message",{timeout: 30000}),
		
		//Rating modal
		RatingModal: () => cy.get("#ratingModal"),

		//Duplicate Notification elements
		DuplicateNotification: () => cy.get("#duplicate-detection"),
		DuplicateMsg: () => cy.get(".panel-body > :nth-child(1) > .col-xs-12"),

		//Outlet elements
		OutletField: () => cy.get("#linkSelectOutlet"),
		OutletModal: () => cy.get("#outletsModal"),
		OutletSelectionOne: () =>
			cy.get(
				":nth-child(2) > .panel-body > .block-grid-xs-1 > .block-grid-item > .control > .control__indicator"
			),
		OutletSelectionTwo: () =>
			cy.get(
				":nth-child(3) > .panel-body > .block-grid-xs-1 > .block-grid-item > .control > .control__indicator"
			),
		OutletConfirmButton: () => cy.get("#btnSelectOutlet"),
		OutletCloseIcon: () => cy.get('[aria-hidden="true"] > .fa'),

		//Jobs listing Page elements
		searchBoxForJobName: () => cy.get('#keyword',{timeout: 40000}),
		moreActionsButton: () => cy.get('[data-cy="More actions"]').first(),

		//Schedule Job
		ScheduleJobTxtBx: () => cy.get("div#c9jobs-scheduledttme-datetime input"),
		PostNowBtn: () => cy.get('[data-cy="Post now"]',{timeout:20000}),
		ConfirmPostNow: () => cy.get('form div button.modal-active-submit').last(),

		//Extend Job
		extendJobBtn: () => cy.get('[data-cy="Extend job post"]'),
		noOfMonthsDropdown: () => cy.get('monthSelect'),
	};

	GoToJobListing = () => {
		this.elements.ManageJobsNavlink().click({force:true});
		//cy.wait(2000);
	};

	GoToPostNewJobForm = () => {
		// this.elements.ManageJobsNavlink().click()
		this.elements.postNewJobBtn().first().click();
	};

	ClickCancelButton = () => {
		this.elements.CancelBtn().click();
		this.elements.ConfirmCancelBtn().click();
	};

	ClickPostNewJobBtn = () => {
		this.elements.PostNewJobBtn().click();
		cy.wait(2000)
	};

	ConfirmSubmit = () => {
		this.elements.ConfirmSubmitJob().click();
	};

	VerifySuccessMsg = () => {
		
		this.elements.SuccessMsg().should("be.visible");
	};

	ExpireTheJobPost = () => {
		this.elements.moreActionsButton().should('be.visible').click({force:true});
		cy.wait(500)
		this.elements.ExpireJobBtn().first().invoke('show').click({force:true});
		cy.wait(100);
		this.elements.ConfirmExpireJob().click();
	};

	SelectPackage = (packageType) => {
		this.elements.PackageType(packageType).click();
	};

	searchForJob = (jobData) => {
		this.elements.searchBoxForJobName().should('exist')
		.and('be.visible')
		.clear()
		.type(jobData.jobTitle+ '{enter}');
		cy.wait(1000)
	}

	EditTheJob = () => {
		this.elements.EditJobBtn().first().click();
	};

	CopyTheJob = () => {
		this.elements.moreActionsButton().click({force:true});
		cy.wait(500);
		this.elements.CopyJobBtn().first().invoke('show').click({force:true});
	};

	VerifyDuplicateNotification = () => {
		const DuplicateMsg = [
			"Oops, this job looks like a copy of an existing active job!",
			"If you would like to proceed, we suggest modifying at least one of these fields to continue:",
			"Job title",
			"Description",
			"Work location(s)",
			"Job type",
		];
		this.elements.DuplicateNotification().should("be.visible");
		this.elements.DuplicateMsg().should("be.visible");
		DuplicateMsg.forEach((errText) => {
			this.elements.DuplicateMsg().contains(errText);
		});
	};

	VerifyRequiredErrMsg = () => {
		const RequiredText = [
			"Please enter Job Title",
			"Please enter Description",
			"Please enter Location",
			"Please enter Sub Location",
			"Please enter Job Category",
			"Please enter Job Type",
			"Please enter your preferred mode of application.",
		];
		this.elements.NewJobFormRequiredErrMsg().should("be.visible");
		RequiredText.forEach((errText) => {
			this.elements.NewJobFormRequiredErrMsg().contains(errText);
		});
	};
	
	FillPostNewJobForm = (isEdit, jobData , jobType, accountType) => {
		if (isEdit == false) {
			this.elements.JobTitle().clear().type(jobData.jobTitle);
			this.elements
				.JobDescription()
				.find('.rtf-content[contenteditable="true"]')
				.type(jobData.jobDesc, { force: true });
				this.elements.JobCategory().select(5);
				this.elements.JobCategoryTwo().select(10);
				this.elements.JobTypePartTime().click();
				this.elements.JobTypeFullTime().click();
	
				this.elements.ApplyByEmail().clear().type(jobData.applyByEmail);
				this.elements.ApplyByCallSms().clear().type(jobData.applyByCallSms);
				
		} else {
			this.elements.JobTitle().clear({ force: true }).type(jobData.jobTitle+" "+"Updated",{ force: true });
			this.elements
				.JobDescription()
				.find('.rtf-content[contenteditable="true"]')
				.type('Updated'+" ", { force: true });
		}
		//Scedule a job
		if (isEdit == false && jobType == 'Scheduled') {
			const daysFromNow = Math.floor(Math.random() * 6) + 1; // Random number between 1 and 6
			const formattedDate = this.getFutureDateWithinDays(daysFromNow, 1);
			this.elements.ScheduleJobTxtBx().type(formattedDate, { force: true });
		}
		// this.elements.Location().select(8);
		// this.elements.SubLocation().select(10);
	
		if (isEdit == false && accountType != 'Outlet') {
			this.elements.AddWorkLocation().click();
			cy.wait(500);
			this.elements.SearchLocation().type("Citta");
			cy.wait(500);
			this.elements.LocationItem().eq(0).click({force:true});
			cy.wait(500);
			this.elements.AddWorkAddressBtn().should('be.visible').should('not.be.disabled').click({force:true});
		} else if(isEdit == false && accountType == 'Outlet') {
			this.elements.AddWorkLocation().click();
			cy.wait(500);
			this.elements.LocationItem().eq(0).click();
			cy.contains("Confirm selection").click();
		}
	};

	verifyWelcomePromptDisplayed = () => { 
		cy.wait(1000)
		cy.get('body').then(($el) =>{
			const welcomePrompt = $el.find('div.prompt-icon');
			if(welcomePrompt.length > 0 && welcomePrompt.is(':visible')){
				cy.log('Welcome prompt is displayed');
				cy.get('div [data-action="explore"]').click();
			}else{
				cy.log('Welcome prompt is not displayed');
			}
		})
	};

	// Verify if Feedback modal is displayed
	VerifyJobPostingFeedbackModal = () => {
		cy.get("body").then(($el) => {
			cy.wait(3000);
			const feedbackModalElement = $el.find("#ratingModal");

			if (feedbackModalElement.length > 0 && feedbackModalElement.is(":visible")) {
				cy.log("Feedback Rating modal is visible");
				//Submits feedback or close the modal?
				cy.get("#rating5").click();
				cy.get(".rating-comments > textarea").type("This is automated Testing!");
				cy.get(".rating-submit").click();

				//Success modal
				cy
					.get(
						"#ratingSuccessModal > .modal-dialog > .modal-content > .modal-header > .modal-close"
					)
					.click();
			} else {
				cy.log("Feedback Rating modal is not visible");
			}
		});
	};

	verifyExpiredJobNotShownInList = () =>{
		cy.get('#jobsList').should('exist').and('contain.text','No jobs found.')
	}

	RepostJob = () => {
		this.elements.PostNowBtn().click({force:true});
		this.elements.ConfirmPostNow().click({force:true});
	}

	getFutureDateWithinDays(daysFromNow, hoursFromNow) {
		const currentDate = new Date();
		console.log('Current date:', currentDate.toString());
	  
		const totalMilliseconds =
			daysFromNow * 24 * 60 * 60 * 1000 + // Days to milliseconds
			hoursFromNow * 60 * 60 * 1000;      // Hours to milliseconds
		console.log('Total milliseconds to add:', totalMilliseconds);
	  
		const futureDate = new Date(currentDate.getTime() + totalMilliseconds);
		console.log('Future date:', futureDate.toString());
	  
		const year = futureDate.getFullYear();
		const month = (`0${futureDate.getMonth() + 1}`).slice(-2); // Months are 0-based, so add 1
		const day = (`0${futureDate.getDate()}`).slice(-2);
		const hours = (`0${futureDate.getHours()}`).slice(-2);
		const minutes = (`0${futureDate.getMinutes()}`).slice(-2);
	  
		console.log('Formatted date components:', { day, month, year, hours, minutes });
	  
		return `${year}-${month}-${day} ${hours}:${minutes}`;
	}
	  
	//Verify if there's a posted job and expire it
	VerifyPostedJobAd = (jobData) => {
		this.GoToJobListing();
		cy.wait(200);

		cy.get("#jobsList").then(($jobAdElement) => {
			const findJobCardElement = $jobAdElement.find(".panel-body");

			if (findJobCardElement.length > 0) {
				cy.log("Have a posted job!");
				this.searchForJob(jobData);
				this.ExpireTheJobPost();
				
			} else {
				cy.log("No Posted job!");
			}
		});
	};
}

module.exports = new JobPostPage();
