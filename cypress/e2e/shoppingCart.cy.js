describe('Shopping cart test', () => {
  it('should add a phone to the cart and verify the total', () => {

    const cartPriceColumnIndex = 2;
    let phoneName;
    let phonePrice;
    let laptopName;
    let laptopPrice;

    cy.visit('https://www.demoblaze.com/index.html');
    cy.intercept('POST', '**/bycat').as('byCat');
    cy.contains('.list-group-item', 'Phones').click();
    cy.wait('@byCat');

    cy.get('.card-title a').first().invoke('text').then((text) => {
      phoneName = text;
      cy.log(phoneName);
    });
    cy.get('.card-block h5').first().invoke('text').then((text) => {
      phonePrice = text.replace('$', '');
      cy.log(phonePrice);
    });
    cy.get('.card-title a').first().click();
    cy.get('#tbodyid .name').should(($el) => {
      expect($el.text()).to.eq(phoneName);
    });
    cy.get('#tbodyid .price-container').should(($el) => {
      expect($el.text()).to.contain(phonePrice);
    });
    cy.window().then((win) => {
      cy.stub(win, 'alert').as('alertStub');
    });
    cy.get('#tbodyid .btn').click();
    cy.get('@alertStub').should('have.been.calledWith', 'Product added');

    cy.intercept('POST', '**/view').as('viewDetail');
    cy.get('#cartur').click();
    cy.wait('@viewDetail').then(() => {
      cy.contains('#tbodyid tr', phoneName).within(() => {
        cy.get('td').eq(cartPriceColumnIndex).should('contain.text', phonePrice);
      });
    });
    cy.contains('.nav-link', 'Home').click();
    cy.contains('.list-group-item', 'Laptops').click();
    cy.wait('@byCat');

    cy.get('.card-title a').eq(1).invoke('text').then((text) => {
      laptopName = text;
      cy.log(laptopName);
    });
     cy.get('.card-block h5').eq(1).invoke('text').then((text) => {
      laptopPrice = text.replace('$', '');
      cy.log(laptopPrice);
    });
    cy.get('.card-title a').eq(1).click();
    cy.get('#tbodyid .name').should(($el) => {
      expect($el.text()).to.eq(laptopName);
    });
    cy.get('#tbodyid .price-container').should(($el) => {
      expect($el.text()).to.contain(laptopPrice);
    });
  });
});
