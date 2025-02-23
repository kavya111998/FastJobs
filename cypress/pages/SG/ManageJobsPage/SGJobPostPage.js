class SGJobPostPage {
	elements = {
		//Elements not related to Job posting form
		EnglishJobsNavlink: () => cy.get(".col-sm-12 > .nav > :nth-child(2) > a",{timeout: 40000}),
		ChineseJobsNavlink: () => cy.get('li.menu-hide a').contains('Chinese',{timeout:20000}),//cy.get('#navbar-employer > div > div > div > ul > li:nth-child(3)',{timeout:40000}),
		PostNewJobBtn: () => cy.get("[data-event='job_posting_initiated']",{timeout: 40000}),
		JoblistingEl: () => cy.get("div.job-ad-box",{timeout: 40000}),
		JobListingTitle: () => cy.get("h1.page-header-title",{timeout: 40000}),

		// Post new job form elements
		UpPostJobBtn: () => cy.get("#save-job"),
		UpSaveDraftBtn: () => cy.get(".job-actions > .save-draft"),

		// Job Details
		JobTitle: () => cy.get("#jobTitleInput input",{timeout:40000}).first(),
		JobClassification: () => cy.get('#other-job-role-input div div input'),
		SelectAutoSuggestedClassification:() => cy.get('div#job-role-option-1'),
		
		SalaryDropdownFirst: () => cy.get("#salflag-dt > .btn"),
		SalaryField: () => cy.get("#maxsals"),
		SalaryType: () => cy.get("#salperiod-dt > .btn"),
		JobDescription: () => cy.get("div.rx-editor-container"),

		NearestMRT: () => cy.get("#c9jobs-regionc"),
		WorkingPlace: () => cy.get("#c9jobs-building"),

		JobCategoryOne: () => cy.get("#c9jobs-category div input"),
		JobCategoryTwo: () => cy.get("#c9jobs-category2"),

		Timing: () => cy.get("#c9jobs-timingc"),

		PartTimeJobType: () => cy.get("li fast-checkbox#job-type-1").shadow().find("input[name='C9jobs[jobtypes][0]']"),
		FullTimeJobType: () => cy.get("li fast-checkbox#job-type-2").shadow().find("input[name='C9jobs[jobtypes][1]']"),
		ContractJobType: () => cy.get("#job-type-3").shadow().find("input[name='C9jobs[jobtypes][2]']"),

		SetOutletsSettingBtn: () => cy.get(".col-xs-12 > :nth-child(3) > .btn"),
		ApplyByEmail: () => cy.get("#c9jobs-appdirecteml"),
		ApplyByCall: () => cy.get("#c9jobs-appdirectmobn"),
		ApplyByWhatsapp: () => cy.get("#c9jobs-appwhatsapp"),
		ApplyBySMS: () => cy.get("#mobile-input"),

		//Job Form new Elements
		AddWorkLocation: () => cy.get(".actions > .fj-btn"),
		SearchLocation: () => cy.get("#location-search-input"),
		LocationItem: () => cy.get(".location-item"),
		AddWorkAddressBtn: () => cy.get('#search-location-modal > div > div > div.modal-body > section.footer > button'),//cy.contains("Add work address"),

		// Preference fields Optional
		EducationLevel: () => cy.get("#c9jobs-edulvlc"),
		JobSkillsOne: () =>
			cy.get(":nth-child(16) > .col-md-12 > .form-group > .block-grid-xs-1 > :nth-child(1) > .form-control"),
		JobSkillsTwo: () =>
			cy.get(":nth-child(16) > .col-md-12 > .form-group > .block-grid-xs-1 > :nth-child(2) > .form-control"),
		JobSkillsThree: () =>
			cy.get(":nth-child(16) > .col-md-12 > .form-group > .block-grid-xs-1 > :nth-child(3) > .form-control"),
		JobLanguageOne: () =>
			cy.get(":nth-child(17) > .col-md-12 > .form-group > .block-grid-xs-1 > :nth-child(1) > .form-control"),
		JobLanguageTwo: () =>
			cy.get(":nth-child(17) > .col-md-12 > .form-group > .block-grid-xs-1 > :nth-child(2) > .form-control"),
		JobLanguageThree: () =>
			cy.get(":nth-child(17) > .col-md-12 > .form-group > .block-grid-xs-1 > :nth-child(3) > .form-control"),
		ApplicationFilter: () => cy.get("#c9jobs-appfilterflag"),
		ScheduledJobPost: () => cy.get("#c9jobs-scheduledttme-datetime > #c9jobs-scheduledttme"),

		// Packages Default
		PackageSelection: () => cy.get(":nth-child(22) > .col-xs-2 > center > label"),

		CancelBtn: () => cy.get("#cancel-job"),
		JobPostingFormPostNewJobBtn: () => cy.get("#save-job"),
		SaveDraftBtn: () => cy.get('div[data-state="normal"] > .btn'),

		ConfirmSubmitJob: () => cy.get("#confirm-btn",{timeout: 40000}),

		//Error message elements
		NewJobFormRequiredErrMsg: () => cy.get(".help-block"),

		//Duplicate Error message
		DuplicateNotification: () => cy.get(".panel-body"),
		DuplicateMsg: () => cy.get(".panel-body > :nth-child(1) > .col-xs-12"),

		//More actions
		MoreActionsBtn: () => cy.get('[data-cy="More actions"]',{timeout:30000}),


		//Expire job elements
		ExpireJobBtn: () => cy.get('[data-cy="Expire job post"]'),
		ConfirmExpireJob: () =>
			cy.get(
				"[data-event='expire_job_confirmed']"
			),

		//Edit Job elements
		EditJobBtn: () => cy.get('[data-cy="Edit job"]',{timeout: 30000}),

		//Copy Job
		CopyJobBtn: () => cy.get("[data-cy='Copy job post']"),

		//Outlet elements
		OutletOne: () => cy.get(".col-md-12 > .block-grid-xs-1 > :nth-child(1) > :nth-child(1)"),
		OutletTwo: () => cy.get(".col-md-12 > .block-grid-xs-1 > :nth-child(2) > :nth-child(1)"),
		OutletThree: () => cy.get(".col-md-12 > .block-grid-xs-1 > :nth-child(3) > :nth-child(1)"),

		//Parking lot elements
		UsageDetails: () => cy.get(".col-sm-12 > :nth-child(21)").contains("Usage details"),
		UsageTitle: () => cy.get(".usage-title"),
		UsageError: () => cy.get(".usage-error"),
		UsageRadioButton: () => cy.get(".usage-radio"),

		//RA Elements
		RAAgencyInfoTitle: () => cy.get("h3"),
		RAInfoLines: () => cy.get(".edit-job-ea-info-liner"),
		EALicenseNo: () => cy.get("#job-ea-company"),
		EAPersonnelNo: () => cy.get("#job-ea-personnel"),
		ADOwner: () => cy.get("#job-ea-list"),
		RACheckbox: () => cy.get(":nth-child(6) > .control > .control__indicator"),
		RAProceedButton: () => cy.get("#continue-edit-ea-btn"),

		//Search Elements
		searchBoxForJobName: () => cy.get("#keyword",{timeout: 40000}),

		//Success message
		SuccessMsg: () => cy.get("div.iziToast-message",{timeout: 30000}),

		//Schedule Job
		ScheduleJobTxtBx: () => cy.get("div#c9jobs-scheduledttme-datetime"),
		PostNowBtn: () => cy.get('[data-cy="Post now"]',{timeout:20000}),
		ConfirmPostNow: () => cy.get('form div button.modal-active-submit').first(),
		
		//Navigate Throgh Tabs
		NavigateToOtherTab: (dynamicValue) => cy.get(`[data-value="${dynamicValue}"]`),

		//Credits available
		coinsAvailable: () => cy.get('span.header-credits-available',{timeout:30000}).last(),
		//Bulk Bump
		BulkBumpBtn: () => cy.get('[data-event="bump_up_initiated"] a',{timeout:30000}),
		SelectAllBtn: () => cy.get('th fast-checkbox[data-action="all"]',{timeout:30000}),
		BumpSelectedJobsBtn: () => cy.get('div.job-action-bump fast-button button',{timeout:30000}),
		confirmBumpBtn: () => cy.get('#bump-confirm-prompt > div.modal-dialog > div > div.modal-footer > fast-button.solid.primary.hydrated > button',{timeout:5000}),//cy.contains('Yes, bump this job',{timeout:30000}),
		bumpDocumentaitionLink: () => cy.get('a.sc-fast-alert'),
		BumpJobBtn: () => cy.get('[data-cy="Bump this job"]'),
		errorToast: () => cy.get('div.iziToast-body',{timeout:10000}),

		//Extend Job Post
		extendJobBtn: () => cy.get('[data-cy="Extend job post"]',{timeout:10000}),
		selectWeekDropdown: () => cy.get('select#weekSelect',{timeout:10000}),
		confirmExtendBtn: () => cy.get('[data-bb-handler="success"]',{timeout:20000})
	};

	GoToJobListing = () => {
		this.elements.EnglishJobsNavlink().should("be.visible").click();
	};

	GoToChineseJobListing = () => {
		cy.wait(1000)
		this.elements.ChineseJobsNavlink().should('be.visible').click();
	}

	GotoPostNewJobForm = () => {
		// this.elements.EnglishJobsNavlink().click()
		this.elements.PostNewJobBtn().first().should("be.visible").click();
	};

	VerifyJobFormElements = (AccountType) => {
		const generalElementsToCheck = [
			this.elements.UpPostJobBtn,
			this.elements.UpSaveDraftBtn,
			this.elements.JobTitle,
			this.elements.SalaryDropdownFirst,
			this.elements.SalaryType,
			this.elements.JobDescription,
			this.elements.JobCategoryOne,
			this.elements.JobCategoryTwo,
			this.elements.PartTimeJobType,
			this.elements.FullTimeJobType,
			this.elements.ContractJobType,
			this.elements.ApplyByEmail,
			this.elements.ApplyByCall,
			this.elements.ApplyByWhatsapp,
			this.elements.ApplyBySMS,
			this.elements.CancelBtn,
			this.elements.JobPostingFormPostNewJobBtn,
			this.elements.SaveDraftBtn,
		];

		const OutletElementsToCheck = [
			this.elements.OutletOne,
			this.elements.OutletTwo,
			this.elements.OutletThree,
			this.elements.PackageSelection,
		];

		const ParkingLotElementsToCheck = [
			this.elements.NearestMRT,
			this.elements.WorkingPlace,
			this.elements.SetOutletsSettingBtn,
			this.elements.UsageDetails,
		];

		//Verify General elements for all account types
		generalElementsToCheck.forEach((element) => {
			element().should("be.visible");
		});

		//Verify outlet elements
		if (AccountType == "outlet") {
			OutletElementsToCheck.forEach((element) => {
				element().should("be.visible");
			});
			cy.log("Outlet section is been verified!");
		}

		//Verify Parking lot elements
		if (AccountType == "parkingLot") {
			ParkingLotElementsToCheck.forEach((element) => {
				element().should("be.visible");
			});
			cy.log("Parking lot section is been verified!");
		}

		if (AccountType == "recruitmentAgency") {
			this.elements.RAAgencyInfoTitle().contains("Recruitment Agency Info").should("be.visible");
			this.elements.EALicenseNo().should("be.visible");
			this.elements.EAPersonnelNo().should("be.visible");
			this.elements.ADOwner().should("be.visible");
			this.elements.RACheckbox().should("be.visible");
		}
	};

	VerifySuccessMsg = () => {
		
		this.elements.SuccessMsg().should("be.visible");
	};

	FillPostNewJobForm = (jobData, AccountType, isUpdated, jobType, jobLanguage) => {

		if (isUpdated) {
			this.elements.JobTitle().clear({force:true}).type(jobData.jobTitle+" "+"Updated",{force:true});	
			//this.elements.JobDescription().find('.rtf-content[contenteditable="true"]').clear().type('Updated'+" "+jobData.jobDesc, { force: true });
		}
		else {
			this.elements.JobTitle().clear({force:true}).type(jobData.jobTitle,{force:true});
			this.elements.JobDescription().find('.rtf-content[contenteditable="true"]').type(jobData.jobDesc, { force: true });
			this.elements.JobClassification().clear({force:true}).type(jobData.jobTitle);

			this.elements.JobCategoryOne().first().scrollIntoView().click({force:true})//.within(()=>{
				//cy.get('fast-select-option[name="C9jobs[CATEGORY]"]').first().click({force:true})
				//cy.wait(200)
				//cy.find('[value="1"]').first().scrollIntoView().click({force:true})
				if(jobLanguage == 'Chinese'){
					cy.contains('临时员工').click({force:true})
				} else {
					cy.contains('Accounting / Finance').click({force:true});
				}
			//})
			this.elements.JobCategoryTwo().click().within(() =>{
				
				cy.get('input[value="20"]').parent().first().click({force:true})
				//cy.contains('Education / Training').scrollIntoView().click({force:true});
			})
			this.elements.JobClassification().scrollIntoView().click({force:true}).type(jobData.jobTitle,{force:true});
			this.elements.PartTimeJobType().click({force:true});
			this.elements.FullTimeJobType().click({force:true});
			this.elements.ApplyByEmail().clear().type(jobData.applyByEmail);
			this.elements.ApplyBySMS().clear().type(jobData.applyByCallSms);
			cy.get('[name="Sms"]').shadow().find('input').click({force:true});
			cy.wait(200)
		}

		if(jobType == 'Scheduled'&& isUpdated == false) {
			const formattedDate = this.getFutureDateWithinDays(5, 1);
  			this.elements.ScheduledJobPost().type(formattedDate, { force: true });
		}
		if (AccountType == "outlet" && isUpdated == false) {

			// New Job posting - Location
			this.elements.AddWorkLocation().click();
			cy.wait(500);
			this.elements.LocationItem().eq(0).click();
			cy.wait(200)
			cy.contains("Confirm selection").click();
		}

		if (AccountType != "outlet" && isUpdated == false) {

			// New Job posting - Location
			this.elements.AddWorkLocation().click();
			cy.wait(500);
			this.elements.SearchLocation().type("Testing");
			cy.wait(200);
			this.elements.LocationItem().eq(0).click();
			cy.wait(200);
			this.elements.AddWorkAddressBtn().should('be.visible').should('not.be.disabled').click();
		}
		
	};
	
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
		const month = futureDate.toLocaleString('en-US', { month: 'short' });
		const day = (`0${futureDate.getDate()}`).slice(-2);
		const hours = (`0${futureDate.getHours()}`).slice(-2);
		const minutes = (`0${futureDate.getMinutes()}`).slice(-2);
	  
		console.log('Formatted date components:', { day, month, year, hours, minutes });
	  
		return `${day}-${month}-${year} ${hours}:${minutes}`;
	  }

	NavigateToOtherTabsInManangeJobs = (tabNo) => {
		this.elements.NavigateToOtherTab(tabNo).click();
		cy.wait(2000);
	}

	ClickCancelButton = () => {
		this.elements.CancelBtn().click();
	};

	ClickPostNewJobBtn = () => {
		this.elements.UpPostJobBtn().scrollIntoView().should("be.visible").click();
	};

	ConfirmSubmit = () => {
		this.elements.ConfirmSubmitJob().click();
		cy.wait(2000);
	};

	VerifyJobListingPage = () => {
		this.elements.JobListingTitle().contains("Manage English Jobs").should("be.visible");
	};

	CopyTheJob = () => {
		this.elements.MoreActionsBtn().first().should("be.visible").click({force:true});
		cy.wait(500)
		this.elements.CopyJobBtn().first().invoke('show').click({force:true});
	};

	EditTheJob = () => {
		this.elements.EditJobBtn().first().should("be.visible").click({force:true});
	};

	VerifyLoaderTextIsDisplayed = () => {
		cy.get(".loader-text").should("be.visible");
	};

	CloseToolTips = () => {
		// Tour - close the tour
		cy.get("#tg-dialog-close-btn").should("be.visible");
		cy.get("#tg-dialog-close-btn").click();
	};

	VerifyRequiredErrMsg = (AccountType) => {
		const RequiredText = [
			"Please enter Job Title",
			"Please enter Description",
			"Please enter Job Category",
			"Please enter Job Type",
			"Please enter your preferred mode of application.",
		];

		//Verify the error message for all account types
		this.elements.NewJobFormRequiredErrMsg().should("be.visible");
		RequiredText.forEach((errText) => {
			this.elements.NewJobFormRequiredErrMsg().contains(errText);
		});

		//Verify the error message specifically for account type
		if (AccountType == "outlet") {
			const OutletRequiredText = "Please choose at least one outlet";
			this.elements.NewJobFormRequiredErrMsg().contains(OutletRequiredText);
			cy.log("Verified outlet error messages");
		}

		if (AccountType == "directEmployer" || AccountType == "parkingLot") {
			const DeRequiredText = "Please enter Nearest MRT";
			this.elements.NewJobFormRequiredErrMsg().contains(DeRequiredText);
			cy.log("Verified DE and ParkingLot error messages");
		}
	};

	VerifyDuplicateNotification = () => {
		const DuplicateMsg = [
			"Oops, this job looks like a copy of an existing active job!",
			"If you would like to proceed, we suggest modifying at least one of these fields to continue:",
			"Job Title",
			"Description",
			"Job Type",
		];
		//this.elements.DuplicateNotification().should("be.visible");
		this.elements.DuplicateMsg().should("be.visible");
		DuplicateMsg.forEach((errText) => {
			this.elements.DuplicateMsg().contains(errText);
		});
	};

	VerifyDuplicateNotificationForChineseJob = () => {
		// const DuplicateMsg = [
		// 	"哎呀，这份招聘广告看起来像是您现有的一份广告的复制!",
		// 	"如果您想继续，请建议您至少修改以下一个字段:",
		// 	"工作职称",
		// 	"描述",
		// 	"工作性质",
		// ];
		this.elements.DuplicateMsg().should("be.visible");
		// DuplicateMsg.forEach((errText) => {
		// 	this.elements.DuplicateMsg().contains(errText);
		// });
	}

	//Recruitment Agency
	RAClickProceedButton = () => {
		this.elements.RAProceedButton().click();
	};

	RAClickCheckbox = () => {
		this.elements.RACheckbox().click();
	};

	//Parking Lot
	VerifyInsufficientSlotErrorMessage = () => {
		const ErrorTitle = "Insufficient slots - select a job post to expire*";
		// const ErrorMessage = "Please select one job post to replace.";

		this.elements.UsageTitle().contains(ErrorTitle).should("be.visible");
		// this.elements.UsageError().contains(ErrorMessage).should("be.visible");
	};

	SelectReplaceJob = () => {
		this.elements.UsageRadioButton().should("be.visible");
		this.elements.UsageRadioButton().click();
	};

	// Verify if Feedback modal is displayed
	VerifyJobPostingFeedbackModal = () => {
		cy.get("body").then(($el) => {
			cy.wait(2000);
			const feedbackModalElement = $el.find("#ratingModal");

			if (feedbackModalElement.length > 0 && feedbackModalElement.is(":visible")) {
				cy.log("Feedback Rating modal is visible");
				//Submits feedback or close the modal?
				cy.get("#rating5").click();
				cy.get(".rating-comments > textarea").type("This is automated Testing!");
				cy.get(".rating-submit").click();

				//Success modal
				cy.get("#ratingSuccessModal > .modal-dialog > .modal-content > .modal-header > .modal-close").click();
			} else {
				cy.log("Feedback Rating modal is not visible");
			}
		});
	};

	searchForJob = (jobData) => {	
		this.elements.searchBoxForJobName().should('exist').and('be.visible')
		.clear()
		.type(jobData.jobTitle + '{enter}');
		cy.wait(1000)
	}

	expireJobPost = () =>{
		this.elements.MoreActionsBtn().first().should("be.visible").click({force:true});
		cy.wait(500)
		this.elements.ExpireJobBtn().first().invoke('show').click({force:true});
		cy.wait(100);
		this.elements.ConfirmExpireJob().click();
	}

	RepostJob = () => {
		this.elements.PostNowBtn().click({force:true});
		this.elements.ConfirmPostNow().click({force:true});
	}

	verifyExpiredJobNotShownInList = () =>{
		cy.get('div.job-list-empty').should('exist').and('be.visible')
	}

	// Check if there's a posted job and expire it
	VerifyPostedJobAd = (jobData) => {
		//this.GoToJobListing();
		cy.wait(1000);

		this.elements
			.JoblistingEl()
			.should("be.visible")
			.then(($jobAdElement) => {
				const findJobCardElement = $jobAdElement.find(".panel-body");

				if (findJobCardElement.length > 0) {
					this.searchForJob(jobData)
					this.expireJobPost();
				} else {
					cy.log("No Posted job!");
				}
			});
	};

	navigateToBulkBumpPage = () => {
		this.elements.BulkBumpBtn().should('exist').click({force:true});
	}

	verifyBulkBumpPageView = () => {
		cy.get('#bump-multiple-jobs > div.page-header > fast-button > a',{timeout:30000}).should('exist'); //Back to english job button
		cy.get('[name="keyword"]').should('exist'); // Search bar
		cy.get('[name="postedby"] div input').first().should('exist'); //Posted by filter
		cy.get('#bump-multiple-jobs > form > div.job-action-bump > fast-button > button').should('exist').and('be.disabled'); //Bump selected job button
		//cy.get('td fast-button a.sc-fast-button').should('exist').and('have.attr','href')
		//Verify table headers
		const expectedHeaders = ['Job title', 'Posted by', 'Last bumped', 'Action'];

		cy.get('tr th').each((header, index) => {
 			 if (index > 0) { 
    			cy.wrap(header).should('contain.text', expectedHeaders[index - 1]);
 			 }
		});
	}

	bumpSelectedJobs = () =>{
		cy.wait(2000);
		this.elements.SelectAllBtn().shadow().find('div.checkbox-mark').click({force:true});
		this.elements.BumpSelectedJobsBtn().click({force:true});
	}

	confirmBump = () => {
		let coinBalance;
		let totalCoins;
		cy.get('table.order-summary',{timeout:30000}).should('exist');
		cy.get('tbody tr td b').should('exist').invoke('text').then((text)=>{
			coinBalance = text.match(/\d+/)[0];
			cy.log(coinBalance)
		})
		this.elements.confirmBumpBtn().should('exist').click();
		cy.wait(2000);
		this.elements.coinsAvailable().invoke('text').then((text) => {
			totalCoins = text.match(/\d+/)[0];
			cy.log(totalCoins);
		})
		expect(coinBalance).to.eq(totalCoins);
	}

	verifyErrorMessageForDuplicateBumps = () => {
		this.elements.errorToast().should('be.visible')
		.and('contain.text','Please try again after 2 minutes.');
	}

	bumpJobsIndivisually = () => {
		this.elements.BumpJobBtn().each(($el, index) => {
			if(index < 5)
			{
				cy.wrap($el).click();
				//this.elements.BumpJobBtn().eq($el).click();
				this.elements.confirmBumpBtn().click();
				cy.wait(1000);
				if (index === 4) {
      				cy.get('div#bump-confirm-prompt tbody').should('contain.text','Surge price')
   				 }
			}
		})
	}

	extendJobPost = () => {
		this.elements.MoreActionsBtn().first().should("be.visible").click({force:true});
		cy.wait(500)
		this.elements.extendJobBtn().first().invoke('show').click({force:true});
		this.elements.confirmExtendBtn().click();
		cy.wait(500);
		//this.elements.SuccessMsg().should('be.visible')
	}
}

module.exports = new SGJobPostPage();
