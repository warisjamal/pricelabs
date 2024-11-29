class MulticalendarPage {
    // Define locators as variables
    multiCalendarSubMenuLocator = 'h4[qa-id="dropdown-value-mcp-v2"]';
    oftenPopUpLocator = 'button[qa-id="mc-default-landing-page-ask-again-button"]';
    listFilterDropDownLocator = '#mc-filters-btn button';
    pmsButtonLocator = 'button[value="pms"]';
    arrowDropDownIconLocator = '.chakra-popover__body div svg[data-testid="ArrowDropDownIcon"]';
    vrmOptionLocator = '#react-select-2-listbox div div div';
    showListingsButtonLocator = '#mc-listing-filter-show-listings';
    listingFilterCheckboxLocator = 'tr .css-wvfq3j label';
    applyOverrideButtonLocator = 'button:contains("Apply Override")';
    dsoFormTitleLocator = 'p[qa-id="dso-modal-title"]';
    datePickerInputLocator = '.react-datepicker__input-container input';
    datePickerHeaderLocator = '.react-datepicker__header';
    datePickerNextButtonLocator = '.react-datepicker__header .css-1dye3pw svg';
    datePickerDayLocator = '.react-datepicker__day';
    fixedPriceLocator = 'input[qa-id="dso-price"]';
    minPriceLocator = 'input[qa-id="dso-min-price"]';
    maxPriceLocator = 'input[qa-id="dso-max-price"]';
    minStayLocator = 'input[qa-id="dso-min-stay"]';
    addPricingButtonLocator = 'button#add-dso:contains("Add Pricing")';
    dateCellLocator = 'tr:nth-child(2) td:nth-child(8)';
    requiredCalendarFieldsLocator = 'div#chakra-toast-manager-top-left div[role="status"] div[data-status="error"]';
    requiredPriceSettingFieldsLocator = 'div#chakra-toast-manager-top-left div[role="status"] div[data-status="error"]';
    saveRefreshButtonLocator = 'button:contains("Save & Refresh")';
    progressBarLocator = 'div[role="progressbar"]';
    updateButtonDate = '.chakra-modal__footer button';

    // Clicks on the Multi Calendar submenu
    multiCalendarSubMenu() {
        cy.get(this.multiCalendarSubMenuLocator)
            .should('have.text', 'Multi Calendar')
            .click();
    }

    // Clicks on the "Ask Again Later" button in the popup
    oftenPopUp() {
        cy.get(this.oftenPopUpLocator)
            .should('have.text', 'Ask Again Later')
            .click();
    }

    // Clicks on the list filter dropdown
    listFilterDropDown() {
        cy.get(this.listFilterDropDownLocator).should('be.visible').click();
    }

    // Selects a PMS option from the dropdown
    selectpms(pmsname) {
        cy.get(this.pmsButtonLocator).should('be.visible').click();
        cy.get(this.arrowDropDownIconLocator).click();
        cy.get(this.vrmOptionLocator).contains(pmsname).click();
        cy.get(this.showListingsButtonLocator).click({ force: true });
    }

    // Selects checkboxes in the left list
    selecLeftList(checkboxesToClick) {
        cy.get(this.listingFilterCheckboxLocator).each(($el, index) => {
            if (index < checkboxesToClick) {
                cy.wrap($el).click();
            }
        });
    }

    // Clicks on the "Apply Override" button
    clickApplyOverride() {
        cy.get(this.applyOverrideButtonLocator).click();
    }

    // Checks if the DSO form title is visible
    dsoformTitle() {
        cy.get(this.dsoFormTitleLocator).should('be.visible');
    }

    // Checks if the required calendar fields error is visible
    requiredCalendarFields() {
        cy.get(this.requiredCalendarFieldsLocator).last().should('be.visible').and('contain.text', 'Please enter dates');
    }

    // Checks if the required price setting fields error is visible
    requiredPriceSettingFields() {
        cy.get(this.requiredPriceSettingFieldsLocator).last()
            .should('be.visible')
            .and('contain.text', 'You need to set at least one custom pricing setting before you add.');
    }

    // Checks if the fixed custom pricing should be greater than 10 error is visible
    reuquiredGreaterTenValueValidation() {
        cy.get(this.requiredPriceSettingFieldsLocator).last()
            .should('be.visible')
            .and('contain.text', 'Fixed custom pricing should be greater than 10');
    }

    // Checks if the fixed custom pricing should be greater than 0 error is visible
    pricePositiveValueValidation() {
        cy.get(this.requiredPriceSettingFieldsLocator).last()
            .should('be.visible')
            .and('contain.text', 'Fixed  custom pricing should be greater than 0.');
    }

    // Sets the fixed price value
    fixedPrice(fixedpricevalue) {
        cy.get(this.fixedPriceLocator).type(fixedpricevalue);
    }

    // Sets the minimum price value
    minPrice(minpricevalue) {
        cy.get(this.minPriceLocator).type(minpricevalue);
    }

    // Sets the maximum price value
    maxPrice(maxpricevalue) {
        cy.get(this.maxPriceLocator).type(maxpricevalue);
    }

    // Sets the minimum stay value
    minStay(minstayvalue) {
        cy.get(this.minStayLocator).type(minstayvalue);
    }

    // Clicks on the "Add Pricing" button
    addPricing() {
        cy.get(this.addPricingButtonLocator).click();
    }

    // Clicks on the update button in the date update popup
    dateUpdatePopup() {
        cy.get(this.updateButtonDate).eq(1).should('contain.text','Update').click({force:true});
    }

    // Clicks on the "Save & Refresh" button
    saveRefresh() {
        cy.get(this.saveRefreshButtonLocator).last().should('be.visible').click();
    }

    // Checks if the progress bar is visible
    progressUpdate() {
        cy.get(this.progressBarLocator).should('exist');
    }

    // Executes negative scenario one for multi-calendar
    negativeMCScenariosOne() {
        this.addPricing();
        this.requiredCalendarFields();
        cy.selectDate('2024-12-15', this);
        this.addPricing();
        this.requiredPriceSettingFields();
    }

    // Executes negative scenario two for multi-calendar
    negativeMCScenariosTwo() {
        this.fixedPrice('-20');
        this.addPricing();
        this.pricePositiveValueValidation();
        this.dateUpdatePopup();
        this.pricePositiveValueValidation();
    }

    // Executes functional scenario for multi-calendar
    functionalMCScenarios() {
        cy.selectDate('2024-12-15', this);
        this.fixedPrice('550');
        this.minPrice('100');
        this.maxPrice('700');
        this.minStay('1');
        this.addPricing();
        this.saveRefresh();
        this.progressUpdate();
    }
}

export default MulticalendarPage;
