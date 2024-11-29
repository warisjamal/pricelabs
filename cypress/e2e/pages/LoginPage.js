class LoginPage {
    constructor() {
        this.usernameField = '#user_email';
        this.passwordField = '#password-field';
        this.submitButton = 'input[type="submit"]';
    }

    visit() {
        cy.visit('/');
    }

    enterUsername(username) {
        cy.get(this.usernameField).should('be.visible').type(username);
    }

    enterPassword(password) {
        cy.get(this.passwordField).should('be.visible').type(password);
    }

    submit() {
        cy.get(this.submitButton).should('be.visible').and('have.value', 'Sign in').click();
    }
}

export default LoginPage;
