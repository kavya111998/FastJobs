class SGUpgradePlan {
	elements = {
		//UpgradePlan link
		upgradePlanLink: () => cy.get(".col-sm-12 > .nav > :nth-child(10) > a"),

		// Choose Plan
		choosePlanBtn: () => cy.get(":nth-child(1) > .package__card > .package__footer > .package__btn"),

		//Billing Information
		fullNameField: () => cy.get("#c9billinfo-fullm"),
		emailField: () => cy.get("#c9billinfo-eml"),
		telNoField: () => cy.get("#c9billinfo-mobn"),
		companyNameField: () => cy.get("#c9billinfo-coym"),
		buildingField: () => cy.get("#c9billinfo-bldg"),
		streetNameField: () => cy.get("#c9billinfo-streetm"),
		blockNoField: () => cy.get("#c9billinfo-blkn"),
		floorNoField: () => cy.get("#c9billinfo-flrn"),
		unitNoField: () => cy.get("#c9billinfo-untn"),
		postalCodeField: () => cy.get("#c9billinfo-pstc"),
		cityField: () => cy.get("#c9billinfo-cityc"),
		countryField: () => cy.get("#c9billinfo-country"),

		billingInfoSubmitButton: () => cy.get(".col-sm-7 > .btn"),
		billingInfoErrorMsg: () => cy.get(".form-group > .help-block"),

		//Payment Details
		cardNameField: () => cy.get("#card-name"),
		cardNumberField: () => cy.iframe("#braintree-hosted-field-number").find("#credit-card-number"),
		expDateField: () => cy.iframe("#braintree-hosted-field-expirationDate").find("#expiration"),
		securityCodeField: () => cy.iframe("#braintree-hosted-field-cvv").find("#cvv"),
		paymentReviewButton: () => cy.get(".col-sm-7 > .btn"),
		paymentReviewErrorMsg: () => cy.get(".invalid-feedback"),

		//Review
		reviewEditButton: () => cy.get("#payment-edit-btn"),
		changePlanButton: () => cy.get("#cancel"),
		confirmPaymentButton: () => cy.get("#pay"),

		//Invoice
		downloadInvoiceButton: () => cy.get(".pull-right a"),
	};

	ClickUpgradePlanLink = () => {
		this.elements.upgradePlanLink().click();
		cy.location("pathname").should("contains", "/p/buy/plans/");
	};

	SelectPackage = () => {
		this.elements.choosePlanBtn().click();
	};

	ClickSubmitBillingInfo = () => {
		this.elements.billingInfoSubmitButton().click();
	};

	// DownloadInvoice = () => {

	// }

	EditPaymentButton = () => {
		this.elements.reviewEditButton().click();
	};

	SubmitBillingInformationEmpty = () => {
		this.elements.fullNameField().clear();
		this.elements.emailField().clear();
		this.elements.telNoField().clear();
		this.elements.companyNameField().clear();
		this.elements.billingInfoSubmitButton().click();
		this.elements.billingInfoErrorMsg().should("be.visible");
	};

	SubmitBillingInformation = () => {
		this.elements.fullNameField().clear().type("Kim QA");
		this.elements.emailField().clear().type("kimjayfastcoqa@gmail.com");
		this.elements.telNoField().clear().type("96349652");
		this.elements.companyNameField().clear().type("Automation Co. (DE)");

		this.elements.streetNameField().type("Anahaw Street");
		this.elements.blockNoField().type("13");
		this.elements.floorNoField().type("1");
		this.elements.unitNoField().type("53");
		this.elements.postalCodeField().type("4400");

		this.ClickSubmitBillingInfo();
		cy.url().should("contains", "/p/buy/pay/?");
	};

	SubmitPaymentDetailsEmpty = () => {
		this.elements.paymentReviewButton().click();
		this.elements.paymentReviewErrorMsg().should("be.visible");
	};

	SubmitWithInvalidPaymentDetails = () => {
		this.elements.cardNameField().type("123123");
		this.elements.cardNumberField().type("123");
		this.elements.expDateField().type("121998");
		this.elements.securityCodeField().type("000");
		this.elements.paymentReviewButton().click();
		this.elements.paymentReviewErrorMsg().should("be.visible");
	};

	SubmitPaymentWithValidDetails = () => {
		this.elements.cardNameField().type("QA User");
		this.elements.cardNumberField().type("4111111111111111");
		this.elements.expDateField().type("122030");
		this.elements.securityCodeField().type("123");
		this.elements.paymentReviewButton().click();
	};

	EditPaymentDetails = () => {
		this.elements.reviewEditButton().click();

		this.elements.cardNameField().clear().type("Kim Luta");
		this.elements.cardNumberField().clear().type("378282246310005");
		this.elements.expDateField().clear().type("122035");
		this.elements.securityCodeField().clear().type("2345");

		this.elements.paymentReviewButton().click();
	};

	ClickChangePlanAtReviewOrder = () => {
		this.elements.changePlanButton().click();
		cy.location("pathname").should("contains", "/p/buy/plans/");
	};

	ClickDownloadInvoice = () => {
		this.elements.confirmPaymentButton().click();
		this.elements.downloadInvoiceButton().invoke('removeAttr','target').click();
	};
}

module.exports = new SGUpgradePlan();
