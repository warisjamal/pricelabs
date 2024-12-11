import ManageListingPage from './pages/manageListingPage';
import commonPage from './pages/commonPage';

const managelisting = new ManageListingPage();
const common = new commonPage();

describe('Manage Listing Scenarios', () => {
    beforeEach(() => {
        cy.fixture('credentials').then(user => {
            cy.login(user.userDetails.username, user.userDetails.password);
        });
    });

    const performCommonSteps = () => {
        common.dynamicPricingDropDwn();
        managelisting.clickManageListingSubMenu();
        managelisting.verifyFilterHeaderText();
        managelisting.clickFilterSelectDropdown();
        managelisting.clickCityOption();
        managelisting.selectCity(['chennai', 'dunes']);
        managelisting.clickApplyFilterButton();
        managelisting.verifyManageListingHeaderText();
    };

    it('Manage Listing - e2e - 1', () => {
        performCommonSteps();
        // negative & functional scenario
        managelisting.searchWithInvalidCharacters();
        managelisting.enterMinPrice('313'); // Intentional scenario: This will fail the success message assertion if you will not change the value
        managelisting.clickMaxPriceInput();
        managelisting.verifyMinPriceUpdatedMessage();
    });

    it('Manage List - e2e - 2', () => {
        performCommonSteps();
        // negative & functional scenario
        managelisting.enterInvalidLatitude();
    });
});
