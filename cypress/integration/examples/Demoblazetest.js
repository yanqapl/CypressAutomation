/// <reference types="Cypress" />

describe('Home page Test Suite', () => {
    beforeEach(() => {
        cy.visit('https://www.demoblaze.com/');
      });
/*
    //Check that pictures in the slider can be scrolled
    it('Pictures in the slider can be scrolled', () => {
        cy.get('.carousel-control-next-icon').click()
        cy.wait(1000)
        cy.get('.carousel-control-next-icon').click()
        cy.wait(1000)
        cy.get('.carousel-control-prev-icon').click()
    })

    //Check that categories change the displayed product on the page
    it('Categories change the displayed product on the page', () => {
        cy.contains('Phones').click()
        cy.wait(1000)
        cy.get('.card-title').should('be.visible').and('have.length', 7) 
        cy.contains('Laptops').click()
        cy.wait(1000)
        cy.get('.card-title').should('be.visible').and('have.length', 6)
        cy.contains('Monitor').click()
        cy.get('.card-title').should('be.visible').and('have.length', 2)
    })


    
    //Check that the products are displayed with their detailed information (name, price and description)
    it('Products are displayed with their detailed information', () => {
        cy.contains('Phones').click()
        cy.get('.card-block').each((card) => {
            cy.wrap(card).within(() => {
                cy.get('.card-title').should('be.visible')
                cy.get('h5').should('be.visible').contains('$')
                cy.get('#article').should('be.visible')
              })
        })
        cy.contains('Laptops').click()
        cy.get('.card-block').each((card) => {
            cy.wrap(card).within(() => {
                cy.get('.card-title').should('be.visible')
                cy.get('h5').should('be.visible').contains('$')
                cy.get('#article').should('be.visible')
              });
        });
        cy.contains('Monitor').click()
        cy.get('.card-block').each((card) => {
            cy.wrap(card).within(() => {
                cy.get('.card-title').should('be.visible')
                cy.get('h5').should('be.visible').contains('$') 
                cy.get('#article').should('be.visible')
              })
        })
    })
    */

    //Check that when you click on a product, you are redirected to the card of the corresponding product
    it('Click on a product redirecting to the card of the corresponding product', () => {
        cy.wait(1000)
        cy.contains('Monitor').click()
        cy.wait(1000)
        cy.get('.card').each(($card) => {
          cy.contains('Monitor').click()
          const productName = $card.find('.card-title').text()
          cy.contains(productName).click()
          cy.get('.name').should('have.text', productName)
          cy.go('back')
        })
    })
})