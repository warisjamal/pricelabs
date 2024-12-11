class LoginPage {
    constructor() {
        this.usernameInputSelector = '#user_email';
        this.passwordInputSelector = '#password-field';
        this.submitButtonSelector = 'input[type="submit"]';
    }

    navigateToLoginPage() {
        cy.visit('/');
    }

    fillUsername(username) {
        cy.get(this.usernameInputSelector).should('be.visible').type(username);
    }

    fillPassword(password) {
        cy.get(this.passwordInputSelector).should('be.visible').type(password);
    }

    clickSubmitButton() {
        cy.get(this.submitButtonSelector).should('be.visible').and('have.value', 'Sign in').click();
    }
}

export default LoginPage;
