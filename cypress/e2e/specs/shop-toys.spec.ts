import cartPage from "../page-objects/cart.page";
import menuComponent from "../page-objects/component/menu.component";
import shopPage from "../page-objects/shop.page";


describe('Shop Toys & Add to Cart', () => {
    
    beforeEach(() => {
        cy.visit('/shop')
    });

    afterEach(() => {
        cy.visit('')
    });

    it('should go to shop page', () => {
        cy.url().should('contain', 'shop')
        //Number of available products should be equal to 8
        shopPage.productsLabel.should('have.length', '8')
    });

    it('should buy a toy', () => {
        //Act
        shopPage.addToCart('Stuffed Frog', 2)
        shopPage.addToCart('Fluffy Bunny', 5)
        shopPage.addToCart('Valentine Bear', 3)
        menuComponent.cartButton.click()
        cartPage.checkOutButton.should('be.visible')


        //Assert
        cartPage.verifyTotal(116.9)
        cartPage.verifyPrice()
    });
});