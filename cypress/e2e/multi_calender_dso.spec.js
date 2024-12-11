
import MulticalendarPage from './pages/MulticalendarPage';
import commonPage from './pages/commonPage';

const multiCalendar = new MulticalendarPage();
const common = new commonPage();
describe('DSO Scenarios', () => {
  beforeEach(() => {
    cy.fixture('credentials').then(user => {
      cy.login(user.userDetails.username, user.userDetails.password);
    });
  });
  it('Mutli calendar DSO - e2e - 1', () => {
    common.dynamicPricingDropDwn();
    multiCalendar.clickMultiCalendarSubMenu();
    multiCalendar.clickAskAgainLaterButton();
    multiCalendar.clickThreeDotsButton();
    multiCalendar.clickThreeDotsapplyOverrideButton();
    multiCalendar.verifyDsoFormTitle();
    // Below are 2 negative Scenarios
    multiCalendar.executeNegativeScenarioOne();
    //Below are 8 functional scenarios for both the e2e scenarios
    multiCalendar.executeFunctionalScenario();
    // Call the helper function to verify API request and response
    multiCalendar.interceptAndVerifyDsoApi('addCustomPricing');
  });
  it('Mutli calendar DSO - e2e - 2', () => {
    common.dynamicPricingDropDwn();
    multiCalendar.clickMultiCalendarSubMenu();
    multiCalendar.clickAskAgainLaterButton();
    multiCalendar.clickThreeDotsButton();
    multiCalendar.clickThreeDotsapplyOverrideButton();
    cy.selectDate('2025-02-7', multiCalendar);
  // Below function contains 2 negative Scenarios
    multiCalendar.executeNegativeScenarioTwo();
  });
});