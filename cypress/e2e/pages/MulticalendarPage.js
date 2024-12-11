class MultiCalendarPage {
    // Define locators as variables
    multiCalendarSubMenuLocator = 'h4[qa-id="dropdown-value-mcp-v2"]';
    askAgainLaterButtonLocator = 'button[qa-id="mc-default-landing-page-ask-again-button"]';
    filterDropdownButtonLocator = '#mc-filters-btn button';
    pmsButtonLocator = 'button[value="pms"]';
    arrowDropdownIconLocator = '.chakra-popover__body div svg[data-testid="ArrowDropDownIcon"]';
    vrmOptionLocator = '#react-select-2-listbox div div div';
    showListingsButtonLocator = '#mc-listing-filter-show-listings';
    listingFilterCheckboxLocator = 'tr label[qa-id*="bulk"]';
    applyOverrideButtonLocator = 'button:contains("Apply Override")';
    dsoFormTitleLocator = 'p[qa-id="dso-modal-title"]';
    datePickerInputLocator = '.react-datepicker__input-container input';
    datePickerHeaderLocator = '.react-datepicker__header';
    datePickerNextButtonLocator = '.react-datepicker__header .css-1dye3pw svg';
    datePickerDayLocator = '.react-datepicker__day';
    fixedPriceInputLocator = 'input[qa-id="dso-price"]';
    minPriceInputLocator = 'input[qa-id="dso-min-price"]';
    maxPriceInputLocator = 'input[qa-id="dso-max-price"]';
    minStayInputLocator = 'input[qa-id="dso-min-stay"]';
    addPricingButtonLocator = 'button#add-dso:contains("Add Pricing")';
    dateCellLocator = 'tr:nth-child(2) td:nth-child(8)';
    calendarErrorLocator = 'div#chakra-toast-manager-top-left div[role="status"] div[data-status="error"]';
    priceSettingErrorLocator = 'div#chakra-toast-manager-top-left div[role="status"] div[data-status="error"]';
    saveRefreshButtonLocator = 'button:contains("Save & Refresh")';
    saveRefreshErrorLocator = 'p:contains("Some listings need Save & Refresh before setting an override.")';
    progressBarLocator = 'div[role="progressbar"]';
    updateButtonLocator = '.chakra-modal__footer button';
    threeDotsButtonLocator = 'tr:nth-child(2) button.chakra-menu__menu-button';
    threeDotsapplyOverrideButtonLocator = 'button.mc-add-overrides-v2';
    adddsoButton = 'button[id="add-dso"]';

    // Clicks on the Multi Calendar submenu
    clickMultiCalendarSubMenu() {
        cy.get(this.multiCalendarSubMenuLocator)
            .should('have.text', 'Multi Calendar')
            .click();
    }

    // Clicks on the "Ask Again Later" button in the popup
    clickAskAgainLaterButton() {
        cy.get(this.askAgainLaterButtonLocator)
            .should('have.text', 'Ask Again Later')
            .click();
    }

    // Clicks on the filter dropdown button
    clickFilterDropdownButton() {
        cy.get(this.filterDropdownButtonLocator).should('be.visible').click();
    }

    // Selects a PMS option from the dropdown
    selectPmsOption(pmsName) {
        cy.get(this.pmsButtonLocator).should('be.visible').click();
        cy.get(this.arrowDropdownIconLocator).click();
        cy.get(this.vrmOptionLocator).contains(pmsName).click();
        cy.get(this.showListingsButtonLocator).click({ force: true });
    }

    // Selects checkboxes in the listing filter
    selectListingFilterCheckboxes(checkboxesToClick) {
        cy.get(this.listingFilterCheckboxLocator).should('be.visible').each(($el, index) => {
            if (index < checkboxesToClick) {
                cy.wrap($el).click();
            }
        });
    }

    // Clicks on the "Apply Override" button
    clickApplyOverrideButton() {
        cy.get(this.applyOverrideButtonLocator).click();
        if (cy.get(this.saveRefreshErrorLocator).should('be.visible')) {
            cy.get(this.saveRefreshButtonLocator).last().should('be.visible').click();
        }
    }

    // Checks if the DSO form title is visible
    verifyDsoFormTitle() {
        cy.get(this.dsoFormTitleLocator).should('be.visible');
    }

    // Checks if the required calendar fields error is visible
    verifyRequiredCalendarFieldsError() {
        cy.get(this.calendarErrorLocator).last().should('be.visible').and('contain.text', 'Please enter dates');
    }

    // Checks if the required price setting fields error is visible
    verifyRequiredPriceSettingFieldsError() {
        cy.get(this.priceSettingErrorLocator).last()
            .should('be.visible')
            .and('contain.text', 'You need to set at least one custom pricing setting before you add.');
    }

    // Checks if the fixed custom pricing should be greater than 10 error is visible
    verifyFixedPriceGreaterThanTenError() {
        cy.get(this.priceSettingErrorLocator).last()
            .should('be.visible')
            .and('contain.text', 'Fixed custom pricing should be greater than 10');
    }

    // Checks if the fixed custom pricing should be greater than 0 error is visible
    verifyFixedPriceGreaterThanZeroError() {
        cy.get(this.priceSettingErrorLocator).last()
            .should('be.visible')
            .and('contain', 'Fixed  custom pricing should be greater than 0.');
    }

    // Sets the fixed price value
    setFixedPrice(fixedPriceValue) {
        cy.get(this.fixedPriceInputLocator).type(fixedPriceValue);
    }

    // Sets the minimum price value
    setMinPrice(minPriceValue) {
        cy.get(this.minPriceInputLocator).type(minPriceValue);
    }

    // Sets the maximum price value
    setMaxPrice(maxPriceValue) {
        cy.get(this.maxPriceInputLocator).type(maxPriceValue);
    }

    // Sets the minimum stay value
    setMinStay(minStayValue) {
        cy.get(this.minStayInputLocator).type(minStayValue);
    }

    // Clicks on the "Add Pricing" button
    clickAddPricingButton() {
        cy.get(this.addPricingButtonLocator).click();
    }

    // Clicks on the update button in the date update popup
    clickUpdateButton() {
        cy.get(this.updateButtonLocator).contains('Update').click({ force: true });
    }

    // Clicks on the "Save & Refresh" button
    clickSaveRefreshButton() {
        cy.get(this.saveRefreshButtonLocator).last().should('be.visible').click();
    }

    // Checks if the progress bar is visible
    verifyProgressBar() {
        cy.get(this.progressBarLocator).should('exist');
    }

    // Executes negative scenario one for multi-calendar
    executeNegativeScenarioOne() {
        this.clickAddDsoButton();
        this.verifyRequiredPriceSettingFieldsError();
        cy.selectDate('2025-01-15', this);
        this.clickAddDsoButton();
        this.verifyRequiredPriceSettingFieldsError();
    }

    // Executes negative scenario two for multi-calendar
    executeNegativeScenarioTwo() {
        this.setFixedPrice('-20');
        this.clickAddDsoButton();
        // this.verifyFixedPriceGreaterThanZeroError();
        this.clickUpdateButton();
        this.verifyFixedPriceGreaterThanZeroError();
    }
    formData = {
        minPrice: '140',
        maxPrice: '740',
        price: '540',
    };
    // Executes functional scenario for multi-calendar
    executeFunctionalScenario() {
        cy.selectDate('2025-01-25', this);
        this.setFixedPrice(this.formData.price);
        this.setMinPrice(this.formData.minPrice);
        this.setMaxPrice(this.formData.maxPrice);
        this.clickAddDsoButton();
    }
    clickThreeDotsButton() {
        cy.get(this.threeDotsButtonLocator).click();
    }
    clickThreeDotsapplyOverrideButton() {
        cy.get(this.threeDotsapplyOverrideButtonLocator).click();
    }
    clickAddDsoButton() {
        cy.get(this.adddsoButton).should('be.visible').click();
    }

    interceptAndVerifyDsoApi(aliasName) {
        cy.intercept('POST', '**/api/add_custom_pricing').as(aliasName);

        cy.wait(`@${aliasName}`).then((interception) => {
            // Verify request payload
            const requestBody = interception.request.body;
            expect(requestBody.minPrice).to.eq(this.formData.minPrice);
            expect(requestBody.maxPrice).to.eq(this.formData.maxPrice);
            expect(requestBody.price).to.eq(this.formData.price);
        });
    };
}

export default MultiCalendarPage;
