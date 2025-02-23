const Chance = require('chance'); 
const chance = new Chance();
import MYSignUpPage from "../../../../cypress/pages/MY/SelfServeMY/MYSelfserve"

let signUpData;

describe.skip("SG Self serve account creation", () => {
    Cypress.on("uncaught:exception", (err, runnable) => {
		console.log(err);
		return false;
	});

    beforeEach(()=>{
        signUpData = {
            employerName: chance.name(),
            email: chance.email(),
            phNo: "147804156",
            password: Cypress.env("SG_DE_Password"),
            companyName: "Fastco"+(Math.floor(Math.random() * 900) + 100),
            BRNno: '001311693U',
            roleNo: '5',
        };
		cy.checkWebsiteAvailability("/");
		cy.pageVisit("/");
        MYSignUpPage.clickOnRegisterButton();
        cy.areYouLookingForJobPopUp();
    })
    
    it('Register as a Direct Employer',()=>{
        MYSignUpPage.fillGetStartedForm(signUpData);
        MYSignUpPage.verifyOTP();
        MYSignUpPage.fillCompanyDetailsForm(signUpData);
        MYSignUpPage.postAJob();
        MYSignUpPage.verifyCompanyIsCreated();
    })
})

