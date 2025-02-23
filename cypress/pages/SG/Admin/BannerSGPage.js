class BannerSG {
	elements = {
		myAccountBtn: () => cy.get(":nth-child(1) > .user-menu"),
        bannerSubMenu: () => cy.contains('Banner'),
		myAccountBannerListing: () => cy.get("ul > :nth-child(1) > a").contains("Banner Listing"),
		bannerListingTable: () => cy.get(".table"),

		// create button
		bannerCreateBtn: () => cy.get(".btn").contains("Create Banner"),

		//uploadBanner
		uploadBanner: () => cy.get("#tmpbanner"),

		//alert
		alertDiv: () => cy.get("#alertdiv"),
	};

	formElements = {
		uploadBannerField: () => cy.get(".input-group > .form-control"),
		bannerDescription: () => cy.get("#description"),
		tagline: () => cy.get("#tagline"),
		buttonText: () => cy.get("#buttontext"),
		title: () => cy.get("#title"),
		postedFrom: () => cy.get("#postedfrom"),
		postedTo: () => cy.get("#postedto"),
		bannerRow: () => cy.get("#row"),
		//jobfuncID: () => cy.get("#jobfuncids"),
		//locID: () => cy.get("#locids"),
		//bannerCoyID: () => cy.get("#coyid"),
		//bannerJobID: () => cy.get("#jobid"),
		bannerUrl: () => cy.get("#url"),
        bannerUrlTitle: () => cy.get("#urltitle"),
		//isFallback: () => cy.get("#isfallback"),
		saveBannerBtn: () => cy.get("button.btn-submit"),
        postedFrom: () => cy.get("div #postedfrom"),
        postedTo: () => cy.get("div #postedto"),
	};

	navigateToBannerListing = () => {
		this.elements.myAccountBtn().click();
        this.elements.bannerSubMenu().should("be.visible").click({force:true});
		this.elements.myAccountBannerListing().should("be.visible").click({force:true});
		this.elements.bannerListingTable().should("be.visible");
	};

	navigateToCreateBanner = () => {
		this.elements.bannerCreateBtn().should("be.visible");
		this.elements.bannerCreateBtn().click();
		cy.url().should("contain", "/p/banner/create");
	};

	verifyBannerFormElement = () => {
		Object.keys(this.formElements).forEach((el) => {
			const form = this.formElements[el];
			form().should("be.visible");
		});
	};

	uploadBannerImage = () => {
		const fileName = "cypress/fixtures/banner.jpeg";
		this.elements.uploadBanner().should("exist");
		this.elements.uploadBanner().selectFile(fileName, { force: true }); // upload file
	};

	verifyAlertDisplayed = (alertClass) => {
		this.elements.alertDiv().should("be.visible");
		this.elements.alertDiv().should("have.class", alertClass);
	};


    getFutureDate(yearsFromNow) {
        const currentDate = new Date();
        const futureDate = new Date(currentDate.setFullYear(currentDate.getFullYear() + yearsFromNow));
        const year = futureDate.getFullYear();
        const month = (`0${futureDate.getMonth() + 1}`).slice(-2);  // Adding 1 since getMonth() returns 0-11
        const day = (`0${futureDate.getDate()}`).slice(-2);

    return `${year}-${month}-${day}`;
    }

	fillBannerForm = (bannerData, isEdit) => {
        const fromDate = this.getFutureDate(0);  // Current date
        const toDate = this.getFutureDate(1);  // One year from now
		this.uploadBannerImage();
		this.formElements.bannerDescription().clear().type(bannerData.descrition);
		this.formElements.buttonText().clear().type(bannerData.buttonText);
		this.formElements.title().clear().type(bannerData.title);
		this.formElements.bannerRow().select(1);
        this.formElements.postedFrom().type(fromDate);
        this.formElements.postedTo().type(toDate);
        this.formElements.bannerUrl().type(bannerData.url);
        this.formElements.bannerUrlTitle().type(bannerData.url);
		this.formElements.saveBannerBtn().click();
	};

	actionBanner = (actionType, bannerTitle) => {
		cy.get(".table").should("be.visible");
		cy.contains("table.table tbody tr", bannerTitle).should("be.visible");
		cy.contains("table.table tbody tr", bannerTitle).as("bannerRow");
		cy.get("@bannerRow").find("a").eq(actionType).should("be.visible");
		cy.get("@bannerRow").find("a").eq(actionType).click({ force: true });
	};
}

module.exports = new BannerSG();
