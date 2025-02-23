const Chance = require('chance'); 
const chance = new Chance();
import SignUpPage from "../../../../cypress/pages/SG/SelfServeSG/SGSelfServePage"
import UpgradePlan from "../../../pages/SG/UpgradePlanPage/UpgradePlanPage";

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
            phNo: "8365 0238",
            password: Cypress.env("SG_DE_Password"),
            companyName: "Fastco"+(Math.floor(Math.random() * 900) + 100),
            BRNno: '199303821R',
            roleNo: '5',
        };
        const employerUrlSG = Cypress.env("employerSG");
		cy.checkWebsiteAvailability(employerUrlSG);
		cy.pageVisit(employerUrlSG);
        SignUpPage.clickOnRegisterButton();
        cy.areYouLookingForJobPopUp();
    })
    
    it('Register as a Direct Employer',()=>{
        SignUpPage.fillGetStartedForm(signUpData);
        SignUpPage.verifyOTP();
        SignUpPage.fillCompanyDetailsForm(signUpData);
        SignUpPage.skipPostJobForm();
        SignUpPage.choosePlan();
        SignUpPage.fillPaymentDetails();
        UpgradePlan.SubmitPaymentWithValidDetails();
        UpgradePlan.ClickDownloadInvoice();
    })
})

