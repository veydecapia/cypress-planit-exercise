import price from "../../fixtures/product-price.json";

class CartPage{

    get checkOutButton(){
        return cy.contains('Check Out')
    }

    get productRow(){
        return cy.get('tr.cart-item.ng-scope')
    }

    /**
     * @description
     * Does 2 things
     * 1. Verifies subtotal for each products (subtotal = price * quantity)
     * 2. Verifies cart total (sum (subtotal))
     * @param expectedTotal 
     */
    verifyTotal = (
        expectedTotal: number
    ) => {
        let price = 0
        let quantity = 0
        let subtotal = 0
        let expectedSubtotal = 0
        let total = 0

        this.productRow.each(($row) => {
            cy.wrap($row).find('td:nth-child(2)')
                        .invoke('text')
                        .then((text) =>{
                            price = Number(this.removeDollarSign(text))
                            cy.log("Price: " + price)
                        })

            cy.wrap($row).find('td:nth-child(3)')
                         .find('input')
                         .invoke('val')
                         .then((text) =>{
                            quantity = Number(text)
                            cy.log("Quantity: " + quantity)
                        })

            cy.wrap($row).find('td:nth-child(4)')
                         .invoke('text')
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


    removeDollarSign = (
        text: string
    ): string => {
        return text.split('')
                    .splice(1)
                    .join('')
    }


    verifyPrice = () => {
        let expectedPrice = 0.00;

        this.productRow.each(($row) => {
            cy.wrap($row).find('td:nth-child(1)')
                         .invoke('text')
                         .then((text) => {
                            cy.log("Text value: " + text)
                            //Get the expected price
                            expectedPrice = price[text.trim()]
                            cy.log("Expected Price : " + expectedPrice)
                         }).then(() => {
                            cy.wrap($row).find('td:nth-child(2)')
                                         .invoke('text')
                                         .should((text) => {
                                            expect(Number(this.removeDollarSign(text)))
                                                        .to.equal(expectedPrice)
                                         })
                         })
        })
    }

}


export default new CartPage()