import menuComponent from "../page-objects/component/menu.component";
import contactPage from "../page-objects/contact.page";
import homePage from "../page-objects/home.page";
import contact from "../../fixtures/contactform-details.json"


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
  
        //**Blank field test */
        //Act
        contactPage.submitButton.click()
  
        //Assert
        contactPage.headerMessageLabel
                .invoke('text')
                .should('contain', "but we won't get it unless you complete the form correctly.")
  
        //** Number of error labels should be equal to 3 */
        contactPage.verifyErrorMessages('is required', 3) 
  
        //**Fill out required fields*/
        //Act
        contactPage.fillOutContactForm(contact.forename, contact.email, contact.messsage)
  
        //Assert
        contactPage.errorLabels.should('not.exist')
    });
  
    it('should successfully submit contact message', () => {
        //Arrange
        menuComponent.contactButton.click()
  
        //Act
        contactPage.fillOutContactForm(contact.forename, contact.email, contact.messsage)
        contactPage.submitButton.click()
        
        //** Wait for the Pop up to disappear before continuing
        contactPage.sendingFeedbackPopup.should('not.be.visible') 
  
  
        //Assert
        contactPage.successLabels.should('be.visible')
        contactPage.successLabels.should('contain', 'we appreciate your feedback.')
    });
  
  
  });
})

