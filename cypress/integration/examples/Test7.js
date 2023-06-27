
/// <reference types="Cypress" />


describe('My Seventh Test Suite', () => {

it('My FirstTest case', () => {

    //Window in window (changing domain)
    cy.visit(Cypress.env('url')+"/AutomationPractice/")

    cy.get('#opentab').then(function(el)
    {
        const url=el.prop('href')
        cy.visit(url) //qaclickacademy.com
        cy.origin(url, ()=>
        {
            cy.get("div.sub-menu-bar a[href*='about']").click()
        })
    })  



})
})