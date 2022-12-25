import menuComponent from "../page-objects/component/menu.component";
import contactPage from "../page-objects/contact.page";
import homePage from "../page-objects/home.page";


Cypress._.times(5, () =>{
  describe('Submit Contact', () => {

    beforeEach(() => {
        //Navigate to Home page
        cy.visit('')
    });
  
    it('should navigate to home page', () => {
        cy.title().should('equal', 'Jupiter Toys')
        homePage.homePageHeaderLabel.should('be.visible')
    });
  
    it('should navigate to contact page', () => {
        //Act
        menuComponent.contactButton.click()
  
        //Assert
        cy.url().should('include', 'contact')
        cy.contains('We welcome your feedback').should('be.visible')
    });
  
    it('should error message displayed', () => {
        //Arrange
        menuComponent.contactButton.click()
  
        //**Blank fields */
        //Act
        contactPage.submitButton.click()
  
        //Assert
        contactPage.headerMessageLabel
                        .invoke('text')
                        .should('contain', "but we won't get it unless you complete the form correctly.")
  
        contactPage.verifyErrorMessages('is required', 3) //** Number of error labels should be equal to 3 */
  
        //**Fill out required fields*/
        //Act
        //TODO: User cypress real events for typing
        //TODO: Create a json file to store test data values
        contactPage.forenameTxtbox.clear().type('John')
        contactPage.emailTxtbox.clear().type('john.example@planit.net.au')
        contactPage.messageTxtArea.clear().type('This is just a test')
  
        //Assert
        contactPage.errorLabels.should('not.exist')
    });
  
    it('should successfully submit contact message', () => {
        //Arrange
        menuComponent.contactButton.click()
  
        //Act
        contactPage.forenameTxtbox.clear().type('John')
        contactPage.emailTxtbox.clear().type('john.example@planit.net.au')
        contactPage.messageTxtArea.clear().type('This is just a test')
        contactPage.submitButton.click()
        
        contactPage.sendingFeedbackPopup.should('not.be.visible') //** Wait for the Pop up to disappear
  
  
        //Assert
        contactPage.successLabels.should('be.visible')
        contactPage.successLabels.should('contain', 'we appreciate your feedback.')
    });
  
  
  });
})

