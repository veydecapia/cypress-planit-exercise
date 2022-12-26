

class MenuComponent{
    get contactButton(){
        return cy.contains('Contact')
    }

    get shopButton(){
        return cy.contains('Shop')
    }

    get  cartButton(){
        return cy.contains("Cart")
    }
}

export default new MenuComponent()