export function row(productName) {
  return cy.contains('#tbodyid tr', productName);
}

export function total() {
  return cy.get('#totalp');
}
