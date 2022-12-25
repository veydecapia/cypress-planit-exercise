

class MenuComponent{
    get contactButton(){
        return cy.contains('Contact')
    }

    get shopButton(){
        return cy.contains('Shop')
    }
}

export default new MenuComponent()