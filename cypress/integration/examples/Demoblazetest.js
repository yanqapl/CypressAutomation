/// <reference types="Cypress" />

describe('Home page Test Suite', () => {
    beforeEach(() => {
        cy.visit('https://www.demoblaze.com/')
    })

    const categoryPhonesLocator = 'a[onclick="byCat(\'phone\')"]'
    const categoryLaptopsLocator = 'a[onclick="byCat(\'notebook\')"]'
    const categoryMonitorsLocator = 'a[onclick="byCat(\'monitor\')"]'
 
    it('Pictures in the slider can be scrolled', () => {
        const nextBottonCarousel = 'a.carousel-control-next'
        const prevBottonCarousel = 'a.carousel-control-prev'

        cy.get('img[alt="First slide"]').should('be.visible')
        cy.get(nextBottonCarousel).click()
        cy.wait(1000).get('img[alt="Second slide"]').should('be.visible')
        cy.get(nextBottonCarousel).click()
        cy.wait(1000).get('img[alt="Third slide"]').should('be.visible')
        cy.get(prevBottonCarousel).click()
        cy.wait(1000).get('img[alt="Second slide"]').should('be.visible')
    })

  
    it('Categories change the displayed product on the page', () => {
        const productPageLocator = 'div[class="card h-100"]'

        //TO DO: I understand that comparing by the number of products isn't the best idea but in theory as an option to get these values, we can query them from the database
        cy.wait(1000).get(categoryPhonesLocator).click()
        cy.get(productPageLocator).should('be.visible').and('have.length', 7)
        cy.wait(1000).get(categoryLaptopsLocator).click()
        cy.get(productPageLocator).should('be.visible').and('have.length', 6)
        cy.get(categoryMonitorsLocator).click()
        cy.get(productPageLocator).should('be.visible').and('have.length', 2)
    })

    it('Products are displayed with their detailed information', () => {
        cy.get(categoryPhonesLocator).click()
        cy.get('div.card-block').each((card) => {
            cy.wrap(card).within(() => {
                cy.get('h4.card-title').should('be.visible')
                cy.get('h5').should('be.visible').contains('$')
                cy.get('p#article.card-text').should('be.visible')
              })
        })
        cy.get(categoryLaptopsLocator).click()
        cy.get('div.card-block').each((card) => {
            cy.wrap(card).within(() => {
                cy.get('h4.card-title').should('be.visible')
                cy.get('h5').should('be.visible').contains('$')
                cy.get('p#article.card-text').should('be.visible')
              });
        });
        cy.get(categoryMonitorsLocator).click()
        cy.get('div.card-block').each((card) => {
            cy.wrap(card).within(() => {
                cy.get('h4.card-title').should('be.visible')
                cy.get('h5').should('be.visible').contains('$') //TO DO: Need to find out options, how to check the price regardless of the value
                cy.get('p#article.card-text').should('be.visible')
              })
        })
    })

    it('Click on a product redirecting to the card of the corresponding product', () => {
        cy.wait(1000).get(categoryMonitorsLocator).click()
        cy.wait(1000).get('div.card').each(($card) => {
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

    it('Check that main elements of product card are displayed', () => {
      cy.get('div.card').contains("Samsung galaxy s6").click()
      cy.get('h2.name').should('have.text',`Samsung galaxy s6`)
      cy.get('h3.price-container').should('be.visible').contains('$')
      cy.get('div#myTabContent.tab-content').should('be.visible')
      cy.get('div.item > img').should('be.visible')
      cy.get('a.btn-success').contains('Add to cart').should('be.visible')
    })

    it('When clicking on the “Add to cart” button, the product is added to the cart', () => {
      cy.get('div.card').contains('Samsung galaxy s6').click()
      cy.wait(1000).get('a.btn-success').contains('Add to cart').click()
      cy.on('window:alert',(str)=>
        {
            expect(str).to.equal('Product added')
        })
      cy.wait(2000).get('a#cartur.nav-link').contains('Cart').click()
      cy.get('tr.success').contains('Samsung galaxy s6')
    })
})

describe('Cart page Test Suite', () => {
    beforeEach(() => {
        cy.visit('https://www.demoblaze.com/')
    })

    it('Shopping cart page opens and closes', () => {
      cy.wait(1000).url().should('not.include',"/cart").get('a#cartur.nav-link').contains('Cart').click()
      cy.url().should('include',"/cart")
      cy.go('back').url().should('not.include',"/cart")
    })

  
    it('Multiple products can be added to the cart', () => {
      cy.get('div.card').contains('Samsung galaxy s6').click()    
      cy.get('a.btn-success').contains('Add to cart').click().type("{enter}")
      cy.wait(1000).get('a.btn-success').contains('Add to cart').click().type("{enter}")
      cy.get('a#cartur.nav-link').contains('Cart').click()
      cy.get('tr.success').should('have.length',2).contains('Samsung galaxy s6')
    })
  
    it('Items in the cart can be removed', () => {
      cy.get('div.card').contains('Samsung galaxy s6').click()
      cy.get('a.btn-success').contains('Add to cart').click().type("{enter}")
      cy.wait(1000).get('a.btn-success').contains('Add to cart').click().type("{enter}")
      cy.get('a#cartur.nav-link').contains('Cart').click()
      cy.wait(1000).get('tr.success').each((product) => {
        cy.wait(1000).wrap(product).within(() => {
        cy.contains('Delete').click()
        })
      cy.get('tr.success').should('have.length',0)
      })
    })
    
    it('“Place order” button opens a modal window with the ordering process', () => {
      cy.get('div.card').contains('Samsung galaxy s6').click()
      cy.get('a.btn-success').contains('Add to cart').wait(1000).click().type("{enter}")
      cy.get('a#cartur.nav-link').contains('Cart').click()
      cy.get('button.btn-success').contains('Place Order').click()
      cy.get('.modal-dialog').should('be.visible')
    })
})


