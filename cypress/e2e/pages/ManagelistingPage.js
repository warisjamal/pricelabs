const LOCATORS = {
    manageListingSubMenu: 'h4[qa-id="dropdown-value-mlp"]',
    filterHeaderText: 'h3[qa-id="filter-modal-title"]',
    filterSelectDropdown: 'div[qa-id="filter-select-dropdown"] button',
    cityOption: 'ul li[id="pd-listing-filter-cities"]',
    customFilterDropdownButton: '.cust-filter-dropdown button',
    customFilterDropdownList: '.cust-filter-dropdown li a',
    applyFilterButton: 'button[qa-id="apply-filter"]',
    manageListingHeaderText: '.main_content h2',
    minPriceInput: 'tr:nth-child(1) input[name="min_price"]',
    maxPriceInput: 'tr:nth-child(1) input[name="max_price"]',
    toastMessage: '.toast-message',
    editLocationLink: 'tr:nth-child(2) .box_location a',
    latitudeInput: '#listing_latitude',
    updateLocationButton: '#edit-location',
    searchBoxInput: '#unmapped_listings input[placeholder="Enter a search term or value"]',
    noRecordsFoundMessage: '#unmapped_listings .no-records-found td'
};

const TEXTS = {
    manageListings: 'Manage Listings',
    viewListingsWith: 'View Listings with',
    rateNegativeValue: 'Rate cannot be a negative value!',
    invalidLocationData: 'Invalid location data. Please check',
    minPriceUpdated: 'Min price -- updated:',
    noMatchingRecords: 'No matching records found'
};

class ManageListingPage {
    // Click on the Manage Listings submenu
    clickManageListingSubMenu() {
        cy.get(LOCATORS.manageListingSubMenu)
            .should('have.text', TEXTS.manageListings)
            .click();
    }

    // Verify the filter header text
    verifyFilterHeaderText() {
        cy.get(LOCATORS.filterHeaderText).should('be.visible').and('contain.text', TEXTS.viewListingsWith);
    }

    // Select listing info from the dropdown
    clickFilterSelectDropdown() {
        cy.get(LOCATORS.filterSelectDropdown).should('be.visible').click();
    }

    // Select city option
    clickCityOption() {
        cy.get(LOCATORS.cityOption).should('be.visible').click();
    }

    // Select a specific city
    selectCity(cityName) {
        cy.get(LOCATORS.customFilterDropdownButton).should('be.visible').click();
        cy.get(LOCATORS.customFilterDropdownList).each($el => {
            const cityNameText = $el.text().trim().toLowerCase();
            if (cityName.includes(cityNameText)) {
                cy.wrap($el).click();
            }
        });
    }

    // Apply the filter
    clickApplyFilterButton() {
        cy.get(LOCATORS.applyFilterButton).click({ force: true });
    }

    // Verify the Manage Listings text
    verifyManageListingHeaderText() {
        cy.get(LOCATORS.manageListingHeaderText).should('be.visible').and('contain.text', TEXTS.manageListings);
    }

    // Enter minimum price value
    enterMinPrice(value) {
        cy.get(LOCATORS.minPriceInput).clear().type(value, { delay: 0 }).trigger('change').trigger('blur');
    }

    // Click on the maximum price input
    clickMaxPriceInput() {
        cy.get(LOCATORS.maxPriceInput).click();
    }

    // Verify failure message for negative rate
    verifyNegativeRateMessage() {
        cy.get(LOCATORS.toastMessage).should('be.visible').and('contain.text', TEXTS.rateNegativeValue);
    }

    // Verify failure message for invalid location data
    verifyInvalidLocationMessage() {
        cy.get(LOCATORS.toastMessage).should('be.visible').and('contain.text', TEXTS.invalidLocationData);
    }

    // Verify success message for updating min price
    verifyMinPriceUpdatedMessage() {
        cy.get(LOCATORS.toastMessage).should('be.visible').and('contain.text', TEXTS.minPriceUpdated);
    }

    // Click on the edit latitude/longitude link
    clickEditLocationLink() {
        cy.get(LOCATORS.editLocationLink).click();
    }

    // Enter latitude value
    enterLatitude(value) {
        cy.get(LOCATORS.latitudeInput).clear().type(value);
    }

    // Update location
    clickUpdateLocationButton() {
        cy.get(LOCATORS.updateLocationButton).click();
    }

    // Enter search value in the search box
    enterSearchValue(searchValue) {
        cy.get(LOCATORS.searchBoxInput).type(searchValue);
    }

    // Verify no records found message
    verifyNoRecordsFoundMessage() {
        cy.get(LOCATORS.noRecordsFoundMessage).should('be.visible').and('contain.text', TEXTS.noMatchingRecords);
    }

    // Negative scenario: search with invalid characters
    searchWithInvalidCharacters() {
        this.enterSearchValue('!@#');
        this.verifyNoRecordsFoundMessage();
        cy.get(LOCATORS.searchBoxInput).clear();
    }

    // Negative scenario: enter invalid latitude value
    enterInvalidLatitude() {
        this.clickEditLocationLink();
        this.enterLatitude('#$%');
        this.clickUpdateLocationButton();
        this.verifyInvalidLocationMessage();
    }
}

export default ManageListingPage;