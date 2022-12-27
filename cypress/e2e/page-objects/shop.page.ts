
class ShopPage{


    get productsLabel(){
        return cy.get('.product-title.ng-binding')
    }

    get cartButton(){
        return cy.get('.cart-count.ng-binding')
    }

    get cartButtonText(){
        return this.cartButton.invoke('text')
    }

    productBuyButton = (
        element: JQuery<HTMLElement>
    ): Cypress.Chainable<JQuery<HTMLElement>> => {
        return cy.wrap(element)
                    .parent()
                    .contains('Buy')
    }

    /**
     * @description
     * Adds the product to cart
     * @param {string} productTitle Product to add
     * @param {number} quantity How many times product will be added to cart
     */
    addToCart = (
        productTitle: string,
        quantity: number
    ) => {
        this.productsLabel.each(($product) =>{
            const productText = $product.text().trim()
            if(productText === productTitle){
                 //Click the buy button n times   
                this.clickBuyButton($product, quantity)
            }
        })
    }


    /**
     * @description
     * Add product to cart by clicking the buy button n (quantity) times
     * @param {JQuery<HTMLElement>} productElement 
     * @param quantity How many times product will be added to cart
     */
    clickBuyButton = (
        productElement: JQuery<HTMLElement>,
        quantity: number
    ) => {
        Cypress._.times(quantity, () => {
            //Get the current count as prevcount
            this.cartButtonText.then((prevCartCount) =>{
                cy.log("Cart count: " + prevCartCount)

                //Click the buy button of the product
                this.productBuyButton(productElement)
                    .click()
                    .then(() =>{
                        //Get the previous value of the cart then add 1
                        const expectedCartCount = Number(prevCartCount) + 1
                        this.cartButtonText.should((cartButtonText)=>{
                            expect(Number(cartButtonText))
                                    .to.equal(expectedCartCount)
                        })     
                    })
            })
        })
    }





}

export default new ShopPage()