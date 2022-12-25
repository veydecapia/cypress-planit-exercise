

class HomePage{

    get homePageHeaderLabel(){
        return cy.contains('Jupiter Toys')
    }
}

export default new HomePage()