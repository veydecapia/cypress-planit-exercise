

class CartPage{

    get checkOutButton(){
        return cy.contains('Check Out')
    }

    get productRow(){
        return cy.get('tr.cart-item.ng-scope')
    }

    // Get price
    // Get quantity
    // Subtotal = price * quantity
    verifyTableValues = (
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
    ) => {
        return text.split('')
                    .splice(1)
                    .join('')
    }

}


export default new CartPage()