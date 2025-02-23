class ManageApplicant {
	element = {
		visitJobPost: () => cy.get("[data-action='visit-post']"),
		applyNowButton: () => cy.get(".col-sm-12 > #btnApplyNow"),

		loginUsername: () => cy.get("[name='IDToken1']"),
		loginPassword: () => cy.get("#password"),
		loginButotn: () => cy.get(".form-group > .btn"),

		locationSelection: () => cy.get(".control__indicator_option"),
		nextApplyButton: () => cy.get("#btnOutletNextDesktop"),

		applyMethod: () => cy.contains("FAST Apply"),
		sendApplicationButton: () =>
			cy.get(".container-apply-btn-back > .btn-primary"),

		successMessage: () => cy.get(".apply-method-desc"),
		jobCardApplicantDetails: () => cy.get(":nth-child(2) > .job-stats-link"),

		moveSuccessMessage: () => cy.get(".iziToast-message"),
		applicantCardDetails: () => cy.get(".job-app-card"),

		moveToShortlisted: () => cy.get("#w3 > .btn-candidate-change-folder"),
		shortlistedTab: () => cy.get(":nth-child(2) > .app-folder-link"),

		moveToRejected: () => cy.get("#w5 > .btn-candidate-change-folder"),
		rejectedTab: () => cy.get(":nth-child(5) > .app-folder-link"),

		moveToKIV: () => cy.get("#w2 > .btn-candidate-change-folder"),
		kivTab: () => cy.get(":nth-child(4) > .app-folder-link"),

		moveToHire: () => cy.get("#w3 > .btn-candidate-change-folder"),
		hireTab: () => cy.get(":nth-child(3) > .app-folder-link"),
	};

	LoginAsJobseeker = (JobseekerCredentials) => {
		this.element.visitJobPost().invoke("removeAttr", "target").click();
		this.element.applyNowButton().should("be.visible");
		this.element.applyNowButton().click();

		this.element.loginUsername().type(JobseekerCredentials.username);
		this.element.loginPassword().type(JobseekerCredentials.password);
		this.element.loginButotn().click();
	};

	ApplyJob = () => {
		this.element.applyNowButton().should("be.visible");
		this.element.applyNowButton().click();

		this.element.locationSelection().should("be.visible");
		this.element.locationSelection().click();
		this.element.nextApplyButton().click();

		this.element.applyMethod().should("be.visible");
		this.element.applyMethod().click();

		this.element.sendApplicationButton().click();
		this.element
			.successMessage()
			.should(
				"contain",
				"Fast Apply(Application has been successfully sent to the employer)"
			);
	};

	verifyMoveSuccessMessage = () => {
		this.element
			.moveSuccessMessage()
			.should("contain", "Applicant was moved successfully.");
	};

	GoToManageApplicant = () => {
		this.element.jobCardApplicantDetails().should("be.visible");
		this.element.jobCardApplicantDetails().click();
	};

	MoveApplicantToShortlisted = () => {
		this.element.hireTab().should("be.visible");
		this.element.hireTab().click();

		cy.wait(1000);

		this.element.applicantCardDetails().should("be.visible");
		this.element.moveToShortlisted().click();
	};

	MoveApplicantToRejected = () => {
		this.element.shortlistedTab().should("be.visible");
		this.element.shortlistedTab().click();

		cy.wait(1000);

		this.element.applicantCardDetails().should("be.visible");
		this.element.moveToRejected().click();
	};

	MoveApplicantToKIV = () => {
		this.element.rejectedTab().should("be.visible");
		this.element.rejectedTab().click();

		cy.wait(1000);

		this.element.applicantCardDetails().should("be.visible");
		this.element.moveToKIV().click();
	};

	MoveApplicantToHire = () => {
		this.element.kivTab().should("be.visible");
		this.element.kivTab().click();
		cy.wait(1000);

		this.element.applicantCardDetails().should("be.visible");
		this.element.moveToShortlisted().click();
		this.element.shortlistedTab().click();
		cy.wait(1000);

		this.element.applicantCardDetails().should("be.visible");
		this.element.moveToHire().click();
	};

	checkApplicantDataIsReceived = () => {
		const maxRetry = 9; // retry for 3 minutes
		let isApplicantReceived = false;
		let retries = 0;

		const checkData = () => {
			cy.get("#jobCandidates").then(($applicantCard) => {
				const applicantEl = $applicantCard.find(".job-app-card");

				if (retries == maxRetry) {
					cy.log("Maximum try is been reached, stopping the code from running!");
					return;
				}

				if (applicantEl.is(":visible")) {
					isApplicantReceived = true;
					cy.log("Application received!");
				} else {
					isApplicantReceived = false;
					retries++;

					cy.wait(20000);
					cy.reload();

					checkData();
				}
			});
		};

		checkData();
	};
}

module.exports = new ManageApplicant();
