export function name() {
  return cy.get('#tbodyid .name');
}

export function price() {
  return cy.get('#tbodyid .price-container');
}

export function addToCart() {
  cy.get('#tbodyid .btn').click();
}
