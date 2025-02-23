class LoginPage {
	elements = {
		// employer login elements
		employerLoginBtn: () => cy.get(":nth-child(6) > .btn"),
		// usernameField: () => cy.get("#loginform-username"),
		// passwordField: () => cy.get("#loginform-password"),

		usernameField: () => cy.get('#login-form > fast-input > div > div > input'),
		passwordField: () => cy.get('#login-form > div > fast-input > div > div > input'),
		loginButton: () => cy.get("#login-form > .sc-fast-button-h > .button"),

		// admin login elements
		adminUsernameField: () => cy.get("#loginform-username"),
		adminPasswordField: () => cy.get("#loginform-password"),
		adminLoginBtn: () => cy.get(".btn").first(),
	};

	loginEmployer = (username, password) => {
		// this.elements.employerLoginBtn().click();

		this.elements.usernameField().type(username);
		this.elements.passwordField().type(password);
		cy.wait(1000);
		this.elements.loginButton().click();

		cy.url().should("contain", "/dashboard");
	};

	adminLoginSG = (username, password) => {
		cy.visit("https://admin-test.fastjobs.sg/");
	
		cy.get("#loginform-username").type(username); 
		cy.get("#loginform-password").type(password); 
		cy.get('[name="login-button"]').contains("Login").click();
		cy.wait(1000);
	
		cy.url().should("contain", "/p/site/otp"); 
	
		cy.visit("https://admin-test.fastjobs.sg/p/site/showotp", { failOnStatusCode: false, force: true });
	
		cy.url().should("contain", "/p/site/showotp");
	
		cy.get(".otp-code").should("be.visible").invoke("text").then((otp) => {
			cy.log(`OTP Code: ${otp}`);
	
			cy.visit("https://admin-test.fastjobs.sg/p/site/otp", { failOnStatusCode: false, force: true });
	
			cy.url().should("contain", "/p/site/otp");
	
			cy.get("#otp_code").type(otp);  
			cy.get("button.btn").contains("Verify").click();
	
			// Step 9: Verify successful login
			cy.url().should("include", "/index");
		});
	};
}	
module.exports = new LoginPage();
