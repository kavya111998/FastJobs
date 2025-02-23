class MYSignUpPage {
	elements = {
		// HomeScreen elements
        employerRegisterBtn: () => cy.get('body > header > div > div > nav > ul.nav-actions > li:nth-child(1) > fast-button > a',{timeout:10000}),

		// step1 SignUp elements
		fullNameTxtBx: () => cy.get('input#signupform-fullname',{timeout:10000}).first(),
        emailTxtBx: () => cy.get('input#signupform-email',{timeout:10000}).first(),
        phNoTxtBx: () => cy.get('input#signupform-mobileno').first(),
        passwordTxtBx: () => cy.get('input#password-input').first(),
        confirmPasswordTxtBx: () => cy.get('input#confirm-password-input').first(),
        nextBtn: () => cy.contains('Next'),

		//Step 3 Company Details
        companyNameTxtBx: () => cy.get('input#createcompanyform-coym',{timeout:20000}),
		BRNnoTxtBx: () => cy.get('input#brn-input'),
		rolesTxtBx: () => cy.get('input#createcompanyform-hiringpos'),
		companySizeDropdown: () => cy.get('select#createcompanyform-sizetype'),
		industryDropdown: () => cy.get('select#createcompanyform-indc'),
		completeAccountBtn: () => cy.contains('Complete account setup'),

		//choose plan
		choosePlan: () => cy.get('input.package__btn',{timeout:20000}),

		paymentDetailsBtn: () => cy.get('button.btn-payment-details',{timeout:20000}),
		streetNameTxtBx: () => cy.get('input#c9billinfo-streetm',{timeout:20000}),
		blockNoTxtBx: () => cy.get('input#c9billinfo-blkn'),
		floorNoTxtNx: () => cy.get('input#c9billinfo-flrn'),
		unitNoTxtBx: () => cy.get('input#c9billinfo-untn'),
		postalCodeTxtBx: () => cy.get('input#c9billinfo-pstc'),

		//Card details
		cardHolderNameTxtBx: () => cy.get('input#card-name'),
		cardNoTxtBx: () => cy.get('input#credit-card-number'),
		expirationDateTxtBx: () => cy.get(''),
		cvvTxtBx: () => cy.get(''),
	};

	clickOnRegisterButton = () => {
		this.elements.employerRegisterBtn().should('be.visible').click({force:true})
	}

	verifyOTP = () => {
		cy.get('input.otp-input',{timeout:20000}).should('exist');
		cy.get('a.btn-back',{timeout:20000}).should('exist');
		//cy.get('button.job-seeker-link').should('exist')
		cy.get('button.btn-verify').should('exist').click({force:true})
	}

	fillGetStartedForm = (signUpData) => {
		this.elements.fullNameTxtBx().should('exist').type(signUpData.employerName);
		this.elements.emailTxtBx().should('exist').type(signUpData.email);
		this.elements.phNoTxtBx().should('exist').type(signUpData.phNo);
		this.elements.passwordTxtBx().should('exist').type(signUpData.password);
		this.elements.confirmPasswordTxtBx().should('exist').type(signUpData.password);
		this.elements.nextBtn().click({force:true})
	}

	fillCompanyDetailsForm = (signUpData) => {
		this.elements.companyNameTxtBx().should('exist').type(signUpData.companyName);
		this.elements.BRNnoTxtBx().should('exist').type(signUpData.BRNno);
		this.elements.rolesTxtBx().should('exist').type(signUpData.roleNo);
		this.elements.companySizeDropdown().select('Start-Up Company');
		this.elements.industryDropdown().select('Accounting / Audit');
		this.elements.completeAccountBtn().should('exist').click();
	}

	postAJob = () => {
		cy.get('#jobTitleInput',{timeout:20000}).should('exist').type('Automated test Job')
		cy.title().should('eq','Post New Job | FastJobs');
        cy.get('div.rx-editor-container').find('.rtf-content[contenteditable="true"]')
        .type("Automated self serve Test Job");
        cy.get("#c9jobs-category").select(5);
        cy.get(":nth-child(1) > .checkbox-box").click({force:true})
        cy.get("#c9jobs-appdirecteml").type('qauser@fastco.asia')
        cy.get(".actions > .fj-btn").click();
        cy.wait(500)
        cy.get("#location-search-input").type("Citta");
        cy.get(".location-item").eq(0).click({force:true});
        cy.contains("Add work address").should('be.visible').should('not.be.disabled').click({force:true});
		cy.get('#postAndPayBtn').should('exist');
	}

	verifyCompanyIsCreated = () => {
        cy.contains('Go to manage jobs',{timeout:20000}).should('exist')
    }
}	
module.exports = new MYSignUpPage();
