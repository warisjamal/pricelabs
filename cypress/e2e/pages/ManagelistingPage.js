const LOCATORS = {
    managelistingSubMenu: 'h4[qa-id="dropdown-value-mlp"]',
    filterHeaderText: 'h3[qa-id="filter-modal-title"]',
    filterSelectDropdown: 'div[qa-id="filter-select-dropdown"] button',
    cityOption: 'ul li[id="pd-listing-filter-cities"]',
    custFilterDropdownButton: '.cust-filter-dropdown button',
    custFilterDropdownList: '.cust-filter-dropdown li a',
    applyFilterButton: 'button[qa-id="apply-filter"]',
    manageListingText: '.main_content h2',
    minPriceInput: 'tr:nth-child(1) input[name="min_price"]',
    maxPriceInput: 'tr:nth-child(1) input[name="max_price"]',
    toastMessage: '.toast-message',
    editLatLongLink: 'tr:nth-child(2) .box_location a',
    latitudeInput: '#listing_latitude',
    updateLocationButton: '#edit-location',
    searchBox: '#unmapped_listings input[placeholder="Enter a search term or value"]',
    noRecordsFound: '#unmapped_listings .no-records-found td'
};

const TEXTS = {
    manageListings: 'Manage Listings',
    viewListingsWith: 'View Listings with',
    rateNegativeValue: 'Rate cannot be a negative value!',
    invalidLocationData: 'Invalid location data. Please check',
    minPriceUpdated: 'Min price -- updated:',
    noMatchingRecords: 'No matching records found'
};

class ManagelistingPage {
    // Click on the Manage Listings submenu
    managelistingSubMenu() {
        cy.get(LOCATORS.managelistingSubMenu)
            .should('have.text', TEXTS.manageListings)
            .click();
    }

    // Verify the filter header text
    filterHeaderText() {
        cy.get(LOCATORS.filterHeaderText).should('be.visible').and('contain.text', TEXTS.viewListingsWith);
    }

    // Select listing info from the dropdown
    selectByListingInfo() {
        cy.get(LOCATORS.filterSelectDropdown).should('be.visible').click();
    }

    // Select city option
    selectCityOptn() {
        cy.get(LOCATORS.cityOption).should('be.visible').click();
    }

    // Select a specific city
    selectCity(citynameValue) {
        cy.get(LOCATORS.custFilterDropdownButton).should('be.visible').click();
        cy.get(LOCATORS.custFilterDropdownList).each($el => {
            const cityName = $el.text().trim().toLowerCase();
            if (citynameValue.includes(cityName)) {
                cy.wrap($el).click();
            }
        });
    }

    // Apply the filter
    applyFilter() {
        cy.get(LOCATORS.applyFilterButton).click({ force: true });
    }

    // Verify the Manage Listings text
    verifyManageListingText() {
        cy.get(LOCATORS.manageListingText).should('be.visible').and('contain.text', TEXTS.manageListings);
    }

    // Enter minimum price value
    enterMinValue(value) {
        cy.get(LOCATORS.minPriceInput).clear().type(value, { delay: 0 }).trigger('change').trigger('blur');
    }

    // Click on the maximum price input
    clickMaxValue() {
        cy.get(LOCATORS.maxPriceInput).click();
    }

    // Verify failure message for negative rate
    failureMessage() {
        cy.get(LOCATORS.toastMessage).should('be.visible').and('contain.text', TEXTS.rateNegativeValue);
    }

    // Verify failure message for invalid location data
    locationFailureMessage() {
        cy.get(LOCATORS.toastMessage).should('be.visible').and('contain.text', TEXTS.invalidLocationData);
    }

    // Verify success message for updating min price
    successMessage() {
        cy.get(LOCATORS.toastMessage).should('be.visible').and('contain.text', TEXTS.minPriceUpdated);
    }

    // Click on the edit latitude/longitude link
    clickEditLatLong() {
        cy.get(LOCATORS.editLatLongLink).click();
    }

    // Enter latitude value
    enterLatitude(value) {
        cy.get(LOCATORS.latitudeInput).clear().type(value);
    }

    // Update location
    updateLocation() {
        cy.get(LOCATORS.updateLocationButton).click();
    }

    // Enter search value in the search box
    searchBox(searchValue) {
        cy.get(LOCATORS.searchBox).type(searchValue);
    }

    // Verify no records found message
    noRecordFound() {
        cy.get(LOCATORS.noRecordsFound).should('be.visible').and('contain.text', TEXTS.noMatchingRecords);
    }

    // Negative scenario: search with invalid characters
    negativeManageListScenariosOne() {
        this.searchBox('!@#');
        this.noRecordFound();
        cy.get(LOCATORS.searchBox).clear();
    }

    // Negative scenario: enter invalid latitude value
    negativeManageListScenariosTwo() {
        this.clickEditLatLong();
        this.enterLatitude('#$%');
        this.updateLocation();
        this.locationFailureMessage();
    }
}

export default ManagelistingPage;