/// <reference types="Cypress" />

context('Window', () => {
let data

    it('Database Interaction', () => {

        cy.sqlServer("select * from Persons").then(function(result)
        {
            console.log(result[1][3])
        })

    })

    it('Get Database Values', () => {
        cy.visit('https://example.cypress.io/commands/waiting')

        cy.sqlServer("select * from Persons").then(function(result)
        {
            data=result
        })

    })

    it('Insert Database Values', () => {
        cy.visit('https://example.cypress.io/commands/waiting')
        cy.get('.wait-input1').type(data[0][2])
        cy.wait(1000)
        cy.get('.wait-input2').type(data[1][1])
    })

})