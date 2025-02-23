class UpgradePlan {
	elements = {
		// Upgrade plan elements
		upgradePlanNavlink: () => cy.get(".nav > .plan-upgrade-nav > a"),
		packagePlan: () =>
			cy.get("input.package__btn").first(),
		checkoutButton: () => cy.get(".col-sm-8 > .btn"),
		SubmitButton: () => cy.get("#btnCCSubmit"),

		confirmAndPayBtn: () => cy.get('button div[part="content"]'),

		fullNameField: () => cy.get("#c9billinfo-fullm"),
		emailNameField: () => cy.get("#c9billinfo-eml"),
		mobileNameField: () => cy.get("#c9billinfo-mobn"),
		compNameField: () => cy.get("#c9billinfo-coym"),

		checkoutRequiredErrMsg: () => cy.get("#checkout-billing-form").find('div.help-block'),

		//2pcp Elements
		CardNumberErrorMessage: () => cy.get("#err_credit_card_number"),
		CardHolderNameErrorMessage: () => cy.get("#err_credit_card_holder_name"),
		CardExpiryErrorMessage: () => cy.get("#err_credit_card_expiry"),
		CVVErrorMessage: () => cy.get("#err_credit_card_cvv"),
		BankNameErrorMessage: () => cy.get("#err_credit_card_issuing_bank_name"),
		demo2pcpUrl: () => "https://demo2.2c2p.com",
	};

	ClickUpgradePlanLink = () => {
		this.elements.upgradePlanNavlink().click();
	};

	SelectPackage = () => {
		this.elements.packagePlan().click();
		cy.location("pathname").should("contains", "/p/buy/checkout");
	};

	ClickConfirmAndPayButton = () => {
		this.elements.confirmAndPayBtn().click();
	};

	//FastJobs checkout flow
	SubmitCheckoutFormEmpty = () => {
		this.elements.fullNameField().clear();
		this.elements.emailNameField().clear();
		this.elements.mobileNameField().clear();
		this.elements.compNameField().clear();
		this.ClickConfirmAndPayButton();
		this.elements.checkoutRequiredErrMsg().should("be.visible");
	};

	SubmitInvalidDetails = () => {
		this.elements.fullNameField().clear();
		this.elements.emailNameField().clear().type("invalid email");
		this.elements.mobileNameField().clear().type("123ABC");
		this.elements.compNameField().clear();
		this.ClickConfirmAndPayButton();
		this.elements.checkoutRequiredErrMsg().should("be.visible");
	};

	//2pcp Checkout flow
	CheckoutSubmitFormEmpty = () => {
		cy.origin("https://demo2.2c2p.com", () => {
			// Verify URL
			cy.url().should("contains", "/2C2PFrontEnd/RedirectV3/payment/Accept");

			cy.get("#btnCCSubmit").click();

			// Verify error messages
			cy.get("#err_credit_card_number").should("be.visible");
			cy.get("#err_credit_card_holder_name").should("be.visible");
			cy.get("#err_credit_card_expiry").should("be.visible");
			cy.get("#err_credit_card_cvv").should("be.visible");
			cy.get("#err_credit_card_issuing_bank_name").should("be.visible");
		});
	};

	CheckoutWithInvalidDetails = () => {
		cy.origin("https://sandbox-pgw-ui.2c2p.com/payment", () => {
			// Verify URL
			cy.url().should("contains", "/payment");

			// Enter invalid details
			cy.get("#tel-cardNumber").type("4111");
			cy.get("#expyear").type("1227");
			cy.get("#tel-cvv").type("01");
			cy.get("#name").type("Kim Jay 123");

			// Submit the form
			cy.get(".btn-primary").click();

			// Verify error messages
			cy
				.get(".input-control > .input-control__error-message")
				.should("be.visible");
		});
	};

	CheckoutWithValidDetails = () => {
		cy.origin("https://sandbox-pgw-ui.2c2p.com/payment", () => {
			// Verify URL
			cy.url().should("contains", "/payment");

			// Enter valid details
			cy.get("#tel-cardNumber").type("4111111111111111");
			cy.get("#expyear").type("1227");
			cy.get("#tel-cvv").type("123");
			cy.get("#name").type("Kim Jay");

			// Submit the form
			cy.get(".btn-primary").click();
		});

		cy.origin("https://demo-emvacs.2c2p.com/", () => {
			//Confirmation
			cy.get(".acs-challenge-form-actions > .proceed").click();

			//OTP
			cy.get(".form-control").type("123456");
			cy.get(".acs-challenge-form-actions > .proceed").click();
			//Return to merchant
			cy.get(".acs-challenge-btn").click();
		});
	};
}

module.exports = new UpgradePlan();
