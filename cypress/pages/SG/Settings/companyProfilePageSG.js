class companyProfilePageSG {
	elements = {
		navSetting: () => cy.get(".menu-setting > a"),
		companyProfileSettings: () => cy.get(":nth-child(6) > :nth-child(1) > a"),

		companyName: () => cy.get("[name='C9coy[DISPM]']").find('input.input-content',{timeout:30000}),
		companyDesc: () => cy.get("textarea[name='C9coy[DSC]']"),

		floorNo: () => cy.get("[name='C9coy[FLRN]']").find('input.input-content'),
		unitNo: () => cy.get("[name='C9coy[UNTN]']").find('input.input-content'),
		streetName: () => cy.get("[name='C9coy[STREETM]']").find('input.input-content'),
		building: () => cy.get("[name='C9coy[BLDG]']").find('input.input-content'),
		state: () => cy.get("[name='C9coy[BLDG]']").find('input.input-content'),
		state: () => cy.get("[placeholder='Select State']"),
		city: () => cy.get("[placeholder='Select City']"),
		//postalCode: () => cy.get('[name="C9coy[PSTC]"]').find('input.sc-fast-input'),
		
		updateSubmitButton: () => cy.get("#company-form-submit > button"),
	};
	goToSetting = () => {
		this.elements.navSetting().click();
	};

	clickCompanyProfile = () => {
		this.elements.companyProfileSettings().click();
	};

	fillCompanyDetails = (newCompanyDetails) => {

		this.elements.companyName().should("exist")
		.clear()
		.type(newCompanyDetails.companyName);

		this.elements.companyDesc().should("exist")
		.clear()
		.type(newCompanyDetails.description);
	};

	fillCompanyAddress = (newCompanyAddress) => {
		this.elements.floorNo().should("exist")
		.clear()
		.type(newCompanyAddress.floorNo);

		this.elements.unitNo().should("exist")
		.clear()
		.type(newCompanyAddress.unitNo);

		this.elements.streetName().should("exist")
		.clear()
		.type(newCompanyAddress.streetName);

		this.elements.building().should("exist")
		.clear()
		.type(newCompanyAddress.building);

		// this.elements.postalCode().should("exist")
		// .clear()
		// .type(newCompanyAddress.postalCode);
	};

	clickSaveChanges = () => {
		this.elements.updateSubmitButton().click();
	};

	verifyUpdateSuccess = (newCompanyDetails, newCompanyAddress) => {
		cy.wait(500);
		this.elements.companyName().should("exist");
		this.elements
			.companyName()
			.should("have.value", newCompanyDetails.companyName);

		this.elements.companyDesc().should("exist");
		this.elements
			.companyDesc()
			.should("have.value", newCompanyDetails.description);

		this.elements.floorNo().should("exist")
			.and("have.value", newCompanyAddress.floorNo);

		this.elements.unitNo().should("exist")
			.and("have.value", newCompanyAddress.unitNo);

		this.elements.streetName().should("exist")
			.and("have.value", newCompanyAddress.streetName);

		this.elements.building().should("exist")
			.and("have.value", newCompanyAddress.building);

		// this.elements.postalCode().should("exist")
		// 	.and("have.value", newCompanyAddress.postalCode);
	};
}

module.exports = new companyProfilePageSG();
