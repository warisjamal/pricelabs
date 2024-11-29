
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
    multiCalendar.multiCalendarSubMenu();
    multiCalendar.oftenPopUp();
    multiCalendar.listFilterDropDown();
    multiCalendar.selectpms('VRM');
    multiCalendar.selecLeftList(2);
    multiCalendar.clickApplyOverride();
    multiCalendar.dsoformTitle();
    // Below are 2 negative Scenarios
    multiCalendar.negativeMCScenariosOne();
    //Below are 8 functional scenarios for both the e2e scenarios
    multiCalendar.functionalMCScenarios();
  });
  it('Mutli calendar DSO - e2e - 2', () => {
    common.dynamicPricingDropDwn();
    multiCalendar.multiCalendarSubMenu();
    multiCalendar.oftenPopUp();
    multiCalendar.selecLeftList(2);
    multiCalendar.clickApplyOverride();
    multiCalendar.dsoformTitle();
    cy.selectDate('2025-02-7', multiCalendar);

    // Below function contains 2 negative Scenarios
    multiCalendar.negativeMCScenariosTwo();
    multiCalendar.saveRefresh();
    multiCalendar.progressUpdate();
  });
});

// location symbol data