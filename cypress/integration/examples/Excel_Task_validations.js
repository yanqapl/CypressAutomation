/// <reference types="Cypress" />
//const excelToJson = require('convert-excel-to-json');
    let productName

describe('JWT Session', () => {
    
    // it('is logged in through local storage', async()=>{
    
    // cy.LoginAPI().then(function()
    // {
    //     cy.visit("https://rahulshettyacademy.com/client",
    //     {
    //         onBeforeLoad :function(window)
    //         {
    //             window.localStorage.setItem('token',Cypress.env('token'))
    //         }

    //     })

    // })
    // })

    it('is logged in through local storage and validate excel', ()=>{
    
        cy.LoginAPI().then(function() 
         {
            // cy.get(".card-body b").eq(1).then(function(ele)
            // {
            //     productName = ele.text();
            // })
            // cy.get(".card-body button:last-of-type").eq(1).click();
            // cy.get("[routerlink*='cart']").click();
            // cy.contains("Checkout").click();
            // cy.get("[placeholder*='Country']").type("ind")
            // cy.get(".ta-results button").each(($el, index, $list)=>
            // {
            //     if($el.text() === "India")
            //     {
            //         cy.wrap($el).click()
            //     }
            // })
            // cy.get(".action__submit").click();
            // cy.wait(2000)
            // cy.get(".order-summary button").contains("Excel").click();
            const filePath = Cypress.config("fileServerFolder")+"/cypress/downloads/order-invoice_ncmo.xlsx"
            cy.task('excelToJsonConverter',filePath).then(function(result)
            {
                cy.log(result.data[1].A);
                expect(productName).to.equal(result.data[1].B);
            })
            cy.readFile(filePath).then(function(text)
            {
                expect(text).to.include(productName);
            })

        })

    })
})