class commonPage {
    dynamicPricingDropDwnLocator = 'a[qa-id="nav-item-title"]';

    dynamicPricingDropDwn() {
        cy.get(this.dynamicPricingDropDwnLocator).click();
    }

}

export default commonPage;