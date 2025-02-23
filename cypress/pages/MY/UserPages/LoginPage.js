class LoginPage {
	elements = {
		// login elements
		usernameField: () => cy.get('#login-form > fast-input > div > div > input'),
		passwordField: () => cy.get('#login-form > div > fast-input > div > div > input'),
		loginButton: () => cy.get("#login-form > .sc-fast-button-h > .button"),
		loginErrorMessage: () => cy.get(".sc-fast-alert-h"),
		employerLoginBtn: () => cy.contains("Login"),

		// admin login elements
		adminUsernameField: () => cy.get("#loginform-username"),
		adminPasswordField: () => cy.get("#loginform-password"),
		adminLoginBtn: () => cy.get(".btn"),
	};

	verifyErrorMessage = () => {
		this.elements.loginErrorMessage().should("be.visible");
	};

	loginEmployer = (username, password) => {
		// this.elements.employerLoginBtn().click();

		this.elements.usernameField().type(username);
		this.elements.passwordField().type(password);
		this.elements.loginButton().should("be.visible").click();
		cy.wait(2000);
		//cy.title().should('contain','Company select | FastJobs')
	};

	loginEmployerWithEmptyfields = () => {
		// this.elements.employerLoginBtn().click();
		cy.wait(2000);
		this.elements.loginButton().click({force:true});
		this.verifyErrorMessage();
	};

	loginEmployerWithInvalidCreds = (username, password) => {
		// this.elements.employerLoginBtn().click();

		this.elements.usernameField().type(username);
		this.elements.passwordField().type(password);
		this.elements.loginButton().click();
		this.verifyErrorMessage();
	};

	adminLoginMY = (username, password) => {
		this.elements.adminUsernameField().type(username);
		this.elements.adminPasswordField().type(password);
		this.elements.adminLoginBtn().click();

		cy.url().should("contain", "/protectedindex");
	};
}

module.exports = new LoginPage();
