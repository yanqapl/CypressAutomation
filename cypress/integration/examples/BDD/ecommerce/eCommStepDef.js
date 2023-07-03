import HomePage from '../pageObjects/HomePage'
import ProductPage from '../pageObjects/ProductPage'
import { Given,When,Then } from "@badeball/cypress-cucumber-preprocessor";

//cypress run --spec cypress\integration\examples\BDD\*.feature --headed --browser chrome
//npx cypress-tags run -e TAGS="@Smoke" --headed --browser chrome
// npx cypress run --spec cypress/integration/examples/BDD/*.feature --headed --browser chrome --env url="https://google.com"

const homePage= new HomePage()
const productPage= new ProductPage()

Given('I open ECommerce Page', ()=>
{
    cy.visit(Cypress.env('url')+'/angularpractice/')
})

// When I add items to Cart
When('I add items to Cart', ()=>
{
    homePage.getShopTab().click()

    this.data.productName.forEach(function(element){
    cy.selectProduct(element)
    })
    productPage.checkOutButton().click()
})

//And Validate the total prices
And('Validate the total prices', ()=>
{
    var sum=0
    cy.get('tr td:nth-child(4) strong').each(($el, index, $list)=> {

        const amount=$el.text()
        var res= amount.split(" ")
        res= res[1].trim()
        sum=Number(sum)+Number(res)
  
      }).then(function(){
        cy.log(sum)
      })
      cy.get('h3 strong').then(function(element){
        const amount=element.text()
        var res= amount.split(" ")
        var total= res[1].trim()
        expect(Number(total)).to.equal(sum)
      })
})

//Then select the country submit and verify Thankyou
Then('select the country submit and verify Thankyou', ()=>
{
    cy.contains('Checkout').click()
    cy.get('#country').type('India')
    cy.get('.suggestions > ul > li > a').click()
    cy.get('#checkbox2').click({force: true})
    cy.get('input[type="submit"]').click()
    //cy.get('.alert').should('have.text','Success! Thank you! Your order will be delivered in next few weeks :-).')
    cy.get('.alert').then(function(element){
        const actualText=element.text()
        expect(actualText.includes("Success")).to.be.true
    })
})

//When I fill the form details
When('I fill the form details',function(dataTable)
{
    homePage.getEditBox().type(this.data.name)
    homePage.getGender().select(this.data.gender)
})

//Then validate the forms behaviour
Then('validate the forms behaviour',function()
{
    homePage.getTwoWayDataBinding().should('have.value',this.data.name)
    homePage.getEditBox().should('have.attr','minlength','2')
    homePage.getEntrepreneaur().should('be.disabled')
    Cypress.config('defaultCommandTimeout',8000)
})

//And select the Shop Page
And('select the Shop Page', ()=>
{
    homePage.getShopTab().click()
})