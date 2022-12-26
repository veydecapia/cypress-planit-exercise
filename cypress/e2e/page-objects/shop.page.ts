
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

    addToCart = (
        productTitle: string,
        quantity: number
    ) => {
        this.productsLabel.each(($product) =>{
            const productText = $product.text().trim()
            cy.log(productText)

            if(productText === productTitle){
                 //Click the buy button n times   
                this.clickBuyButton($product, quantity)
            }
        })
    }


    clickBuyButton = (
        product: JQuery<HTMLElement>,
        quantity: number
    ) => {
        Cypress._.times(quantity, () => {
            //Get the current count as prevcount
            this.cartButtonText.then((prevCartCount) =>{
                cy.log("Cart count: " + prevCartCount)

                //Click the buy button of the product
                cy.wrap(product)
                    .parent()
                    .contains('Buy')
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