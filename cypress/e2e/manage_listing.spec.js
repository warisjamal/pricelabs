import ManagelistingPage from './pages/manageListingPage';
import commonPage from './pages/commonPage';

const managelisting = new ManagelistingPage();
const common = new commonPage();

describe('Manage Listing Scenarios', () => {
    beforeEach(() => {
        cy.fixture('credentials').then(user => {
            cy.login(user.userDetails.username, user.userDetails.password);
        });
    });

    const performCommonSteps = () => {
        common.dynamicPricingDropDwn();
        managelisting.managelistingSubMenu();
        managelisting.filterHeaderText();
        managelisting.selectByListingInfo();
        managelisting.selectCityOptn();
        managelisting.selectCity(['chennai', 'dunes']);
        managelisting.applyFilter();
        managelisting.verifyManageListingText();
    };

    it('Manage Listing - e2e - 1', () => {
        performCommonSteps();
        // negative & functional scenario
        managelisting.negativeManageListScenariosOne();
        managelisting.enterMinValue('315'); // Intentional scenario: This will fail the success message assertion if you will not change the value
        managelisting.clickMaxValue();
        managelisting.successMessage();
    });

    it('Manage List - e2e - 2', () => {
        performCommonSteps();
        // negative & functional scenario
        managelisting.negativeManageListScenariosTwo();
    });
});
