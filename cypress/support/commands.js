Cypress.Commands.add('stubAlert', () => {
  cy.window().then((win) => {
    cy.stub(win, 'alert').as('alertStub');
  });
});

Cypress.Commands.add('expectAlert', (message) => {
  cy.get('@alertStub').should('have.been.calledWith', message);
});
