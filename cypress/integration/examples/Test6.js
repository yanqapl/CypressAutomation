
/// <reference types="Cypress" />


describe('My Sixth Test Suite', () => {

it('My FirstTest case', () => {

    //Mouse hover popus
    cy.visit("https://rahulshettyacademy.com/AutomationPractice/")

    //cy.get('div.mouse-hover-content').invoke('show') // if you need hover and click on hidden element
    cy.contains('Top').click({force: true}) // {force: true} if you don't need hover and want just click
    cy.url().should('include','top')
    })  
})