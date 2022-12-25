

class ContactPage{

    get submitButton(){
        return cy.contains('Submit')
    }

    get headerMessageLabel(){
        return cy.get('#header-message')
    }

    get forenameTxtbox(){
        return cy.get('#forename')
    }

    get surnameTxtbox(){
        return cy.get('#surname')
    }

    get emailTxtbox(){
        return cy.get('#email')
    }

    get messageTxtArea(){
        return cy.get('#message')
    }

    
    //**Error Messages */

    get errorLabels(){
        return cy.get('.help-inline.ng-scope')
    }

    /**
     * @description
     * 
     * @param {string} expectedErrorText 
     * @param {number} expectedNumberOfErrors 
     */
    verifyErrorMessages = (
        expectedErrorText: string,
        expectedNumberOfErrors: number
    ) => {

        this.errorLabels.should('have.length', expectedNumberOfErrors)
 
        this.errorLabels.each(($object) => {
            const text = $object.text();
            cy.log(text)

            cy.wrap($object).invoke('text')
                .should((errorText) =>{
                    expect(errorText).to.contain(expectedErrorText)
                })
        
        })
    }


    //**Successs */

    get successLabels(){
        return cy.get('.alert.alert-success')
    }

    get sendingFeedbackPopup(){
        return cy.get('.popup.modal.hide.ng-scope', {timeout: 60000})
    }



}


export default new ContactPage()