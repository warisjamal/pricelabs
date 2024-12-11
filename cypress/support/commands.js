import LoginPage from '../e2e/pages/LoginPage';

Cypress.Commands.add('login', (username, password) => {
    const loginPage = new LoginPage();
    loginPage.navigateToLoginPage('/');
    loginPage.fillUsername(username);
    loginPage.fillPassword(password);
    loginPage.clickSubmitButton();
    cy.url().should('include', '/pricing');
});

Cypress.Commands.add('selectDate', (userInputDate, pageInstance) => {
    const [targetYear, targetMonth, targetDay] = userInputDate.split('-');

    // Open the calendar
    cy.get(pageInstance.datePickerInputLocator).first().click();

    // Function to get month name
    const getMonthName = (month) => {
        const months = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December',
        ];
        return months[parseInt(month, 10) - 1];
    };

    // Function to select day from the calendar
    const selectDayFromCalendar = (calendarSelector, day) => {
        cy.get(`${calendarSelector} ${pageInstance.datePickerDayLocator}`)
            .contains(day)
            .click({ force: true });
        cy.get(`${calendarSelector} ${pageInstance.datePickerDayLocator}`).contains(day).click();
        cy.get(pageInstance.datePickerInputLocator)
            .first()
            .should('contain.value', day);
    };

    // Function to select month and year
    const selectMonthAndYear = () => {
        cy.get(pageInstance.datePickerHeaderLocator).then(($headers) => {
            const leftHeader = $headers.eq(0).text();
            const rightHeader = $headers.eq(1).text();

            // Check which calendar (left or right) contains the target month and year
            if (
                leftHeader.includes(`${targetYear}`) &&
                leftHeader.includes(getMonthName(targetMonth))
            ) {
                selectDayFromCalendar('.react-datepicker__month:eq(0)', targetDay);
            } else if (
                rightHeader.includes(`${targetYear}`) &&
                rightHeader.includes(getMonthName(targetMonth))
            ) {
                selectDayFromCalendar('.react-datepicker__month:eq(1)', targetDay);
            } else {
                // Navigate to next month and retry
                if (pageInstance.datePickerNextButtonLocator.length > 1) {
                    cy.get(pageInstance.datePickerNextButtonLocator).last().click();
                } else {
                    cy.get(pageInstance.datePickerNextButtonLocator).click();
                }
                selectMonthAndYear(); // Recursive call
            }
        });
    };

    // Start selecting the month and year
    selectMonthAndYear();
});

Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
});