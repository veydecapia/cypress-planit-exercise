

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

    fillOutContactForm = (
        forename: string,
        email: string,
        message: string
    ): void => {
        this.forenameTxtbox.clear().type(forename)
        this.emailTxtbox.clear().type(email)
        this.messageTxtArea.clear().type(message)
    }

    
    //**Error Messages */

    get errorLabels(){
        return cy.get('.help-inline.ng-scope')
    }

    /**
     * @description
     * Gets the error labels and compare to expected error messages
     * @param {string} expectedErrorText 
     * @param {number} expectedNumberOfErrors 
     */
    verifyErrorMessages = (
        expectedErrorText: string,
        expectedNumberOfErrors: number
    ): void => {

        this.errorLabels.should('have.length', expectedNumberOfErrors)
 
        this.errorLabels.each(($object) => {
            const text = $object.text();
            cy.log(text)

            cy.wrap($object)
                .invoke('text')
                .should((errorText) =>{
                    expect(errorText)
                        .to.contain(expectedErrorText)
                })
        
        })
    }


    //**Successs */

    get successLabels(){
        return cy.get('.alert.alert-success')
    }

    get sendingFeedbackPopup(){
        //Add timeout to explicitly wait for popup to hide
        return cy.get('.popup.modal.hide.ng-scope', {timeout: 60000})
    }



}


export default new ContactPage()