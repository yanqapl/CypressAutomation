/// <reference types="Cypress" />

describe('Home page Test Suite', () => {
    beforeEach(() => {
        cy.visit('https://www.demoblaze.com/')
    })
    
    //Check that pictures in the slider can be scrolled
    it('Pictures in the slider can be scrolled', () => {
        cy.wait(1000)
        cy.get('img[src="Samsung1.jpg"]').should('be.visible')
        cy.get('a.carousel-control-next').click()                                                            
        cy.wait(1000)
        cy.get('img[src="nexus1.jpg"]').should('be.visible')
        cy.get('a.carousel-control-next').click()
        cy.wait(1000)
        cy.get('img[src="iphone1.jpg"]').should('be.visible')
        cy.get('a.carousel-control-prev').click()
        cy.get('img[src="nexus1.jpg"]').should('be.visible')
    })
    //Check that categories change the displayed product on the page
    it('Categories change the displayed product on the page', () => {
        cy.get('a.list-group-item').contains("Phones").click()
        cy.wait(1000)
        cy.get('h4.card-title').should('be.visible').and('have.length', 7) 
        cy.get('a.list-group-item').contains("Laptops").click()
        cy.get('h4.card-title').should('be.visible').and('have.length', 6)
        cy.wait(1000)
        cy.get('a.list-group-item').contains("Monitor").click()
        cy.get('h4.card-title').should('be.visible').and('have.length', 2)
    })

    //Check that the products are displayed with their detailed information (name, price and description)
    it('Products are displayed with their detailed information', () => {
        cy.get('a.list-group-item').contains("Phones").click()
        cy.get('div.card-block').each((card) => {
            cy.wrap(card).within(() => {
                cy.get('h4.card-title').should('be.visible')
                cy.get('h5').should('be.visible').contains('$')
                cy.get('p#article.card-text').should('be.visible')
              })
        })
        cy.get('a.list-group-item').contains("Laptops").click()
        cy.get('div.card-block').each((card) => {
            cy.wrap(card).within(() => {
                cy.get('h4.card-title').should('be.visible')
                cy.get('h5').should('be.visible').contains('$')
                cy.get('p#article.card-text').should('be.visible')
              });
        });
        cy.get('a.list-group-item').contains("Monitor").click()
        cy.get('div.card-block').each((card) => {
            cy.wrap(card).within(() => {
                cy.get('h4.card-title').should('be.visible')
                cy.get('h5').should('be.visible').contains('$')
                cy.get('p#article.card-text').should('be.visible')
              })
        })
    })
    
    //Check that when you click on a product, you are redirected to the card of the corresponding product
    it('Click on a product redirecting to the card of the corresponding product', () => {
        cy.wait(1000)
        cy.get('a.list-group-item').contains("Monitor").click()
        cy.wait(1000)
        cy.get('div.card').each(($card) => {
          cy.get('a.list-group-item').contains("Monitor").click()
          const productTitle = $card.find('h4.card-title').text()
          cy.contains(productTitle).click()
          cy.get('h2.name').should('have.text', productTitle)
          cy.go('back')
        })
    })
})


describe('Product page Test Suite', () => {
    beforeEach(() => {
        cy.visit('https://www.demoblaze.com/')
    })

    //Check that when you go to the product card, the name, price, description, product picture and the “Add to cart” button are displayed
    it('When you go to the product card, the name, price, description, product picture and the “Add to cart” button are displayed', () => {
      cy.get('div.card').contains("Samsung galaxy s6").click()
      cy.get('h2.name').should('have.text',`Samsung galaxy s6`)
      cy.get('h3.price-container').should('be.visible').contains('$')
      cy.get('div#myTabContent.tab-content').should('be.visible')
      cy.get('div.item > img').should('be.visible')
      cy.get('a.btn-success').contains('Add to cart').should('be.visible')
    })


    //Check that when clicking on the “Add to cart” button, the product is added to the cart
    it('When clicking on the “Add to cart” button, the product is added to the cart', () => {
      cy.get('div.card').contains('Samsung galaxy s6').click()
      cy.get('a.btn-success').contains('Add to cart').click()
      cy.wait(1000)
      cy.on('window:alert',(str)=>
        {
            expect(str).to.equal('Product added')
        })
      cy.wait(2000)
      cy.get('a#cartur.nav-link').contains('Cart').click()
      cy.get('tr.success').contains('Samsung galaxy s6')
    })
})
/*
describe('Cart page Test Suite', () => {
    beforeEach(() => {
        cy.visit('https://www.demoblaze.com/')
    })
    //Check that the shopping cart page opens and closes
    it('Shopping cart page opens and closes', () => {
      cy.get(.)contains('Cart').click()               //сделать проверку что url изменился
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
*/

