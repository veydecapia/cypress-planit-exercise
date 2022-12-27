import price from "../../fixtures/product-price.json";

class CartPage{

    get checkOutButton(){
        return cy.contains('Check Out')
    }

    get productRow(){
        return cy.get('tr.cart-item.ng-scope')
    }

    productTitleText = (
        row: JQuery<HTMLElement>
    ): Cypress.Chainable<string> =>{
        return cy.wrap(row)
                .find('td:nth-child(1)')
                .invoke('text')
    }

    priceText = (
        row: JQuery<HTMLElement>
    ): Cypress.Chainable<string> =>{
        return cy.wrap(row)
                .find('td:nth-child(2)')
                .invoke('text')
    }

    quantityText = (
        row: JQuery<HTMLElement>
    ): Cypress.Chainable<string> =>{
        return cy.wrap(row)
                .find('input')
                .invoke('val')
    }

    subtotalText = (
        row: JQuery<HTMLElement>
    ): Cypress.Chainable<string> =>{
        return cy.wrap(row)
                .find('td:nth-child(4)')
                .invoke('text')
    }

    /**
     * @description
     * Does 2 things
     * 1. Verifies subtotal for each products (subtotal = price * quantity)
     * 2. Verifies cart total (sum (subtotal))
     * @param {number} expectedTotal Value to compare to the actual cart total value
     */
    verifyTotal = (
        expectedTotal: number
    ) => {
        let price = 0.00
        let quantity = 0.00
        let subtotal = 0.00
        let expectedSubtotal = 0.00
        let total = 0.00

        this.productRow.each(($row) => {
            this.priceText($row)
                .then((text) =>{
                    price = Number(this.removeDollarSign(text))
                    cy.log("Price: " + price)
                })

            this.quantityText($row)
                .then((value) =>{
                    quantity = Number(value)
                    cy.log("Quantity: " + quantity)
                })

            this.subtotalText($row)
                .then((text) =>{
                    subtotal = Number(this.removeDollarSign(text))
                    cy.log("Subtotal: " + subtotal)
                    expectedSubtotal = price * quantity
                }).should(() => {
                    expect(subtotal).to.equal(expectedSubtotal)
                }).then(() => {
                    total += subtotal
                    cy.log("Total : " + total)
                })
        }).should(() => {
            expect(total).to.equal(expectedTotal)
        })
    }

    /**
     * @description 
     * Removes the first character on the text (dollar sign character)
     * @param {string} text Text to remove the dollar sign
     * @returns string text without dollar sign
     */
    removeDollarSign = (
        text: string
    ): string => {
        return text.split('')
                    .splice(1)
                    .join('')
    }

    /**
     * @description
     * Gets the expected price from the json file and compares to the actual price
     * json file should have the complete list of products with expected pricing 
     * json file name: product-price.json
     * path: fixtures/product-price.json
     */
    verifyPrice = () => {
        let expectedPrice = 0.00;

        this.productRow.each(($row) => {
            this.productTitleText($row)
                .then((text) => {
                    cy.log("Product Title: " + text)
                    //Get the expected price
                    expectedPrice = price[text.trim()]
                    cy.log("Expected Price : " + expectedPrice)
                }).then(() => {
                    this.priceText($row)
                        .should((text) => {
                            expect(Number(this.removeDollarSign(text)))
                                        .to.equal(expectedPrice)
                        })
                })
        })
    }

}


export default new CartPage()