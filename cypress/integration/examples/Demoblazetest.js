/// <reference types="Cypress" />

describe('Home page Test Suite', () => {
    beforeEach(() => {
        cy.visit('https://www.demoblaze.com/');
      });

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
        cy.wait(1000)
        cy.contains('Phones').click()
        cy.get('.card-title').should('be.visible').and('have.length', 7) 
        cy.contains('Laptops').click()
        cy.get('.card-title').should('be.visible').and('have.length', 6)
        cy.wait(1000)
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
    
    //Check that when you click on a product, you are redirected to the card of the corresponding product
    it('Click on a product redirecting to the card of the corresponding product', () => {
        cy.wait(1000)
        cy.contains('Monitor').click()
        cy.wait(1000)
        cy.get('.card').each(($card) => {
          cy.contains('Monitor').click()
          const productTitle = $card.find('.card-title').text()
          cy.contains(productTitle).click()
          cy.get('.name').should('have.text', productTitle)
          cy.go('back')
        })
    })
    

    //Check that when you go to the product card, the name, price, description, product picture and the “Add to cart” button are displayed
    it('When you go to the product card, the name, price, description, product picture and the “Add to cart” button are displayed', () => {
      cy.get('.card').contains('Samsung galaxy s6').click()
      cy.get('.name').should('have.text',`Samsung galaxy s6`)
      cy.get('.price-container').should('be.visible').contains('$')
      cy.get(".description").should('be.visible')
      cy.get(".item > img").should('be.visible')
      cy.contains('Add to cart').should('be.visible')
    })

    //Check that when clicking on the “Add to cart” button, the product is added to the cart
    it('When clicking on the “Add to cart” button, the product is added to the cart', () => {
      cy.get('.card').contains('Samsung galaxy s6').click()
      cy.contains('Add to cart').click()
      cy.wait(1000)
      cy.on('window:alert',(str)=>
        {
            expect(str).to.equal('Product added')
        })
      cy.wait(2000)
      cy.contains('Cart').click()
      cy.get('.success').contains('Samsung galaxy s6')
    })
    

    //Check that the shopping cart page opens and closes
    it('Shopping cart page opens and closes', () => {
      cy.contains('Cart').click()
      cy.contains('Home').click()
    })

    //Check that multiple products can be added to the cart
    it('Multiple products can be added to the cart', () => {
      cy.get('.card').contains('Samsung galaxy s6').click()    
      cy.contains('Add to cart').click().click()
      cy.contains('Cart').click()
    })

    //Check that items in the cart can be removed
    it('Items in the cart can be removed', () => {
      cy.get('.card').contains('Samsung galaxy s6').click()
      cy.contains('Add to cart').click().click()
      cy.contains('Cart').click()
      cy.wait(2000)
      cy.get('.success').each((product) => {
        cy.wrap(product).within(() => {
        cy.contains('Delete').click()
        })
      })
    })

    //Check that the “Place order” button opens a modal window with the ordering process
    it('“Place order” button opens a modal window with the ordering process', () => {
      cy.get('.card').contains('Samsung galaxy s6').click()
      cy.contains('Add to cart').click()
      cy.contains('Cart').click()
      cy.contains('Place Order').click()
      cy.get('.modal-dialog').should('be.visible')
    })
})


