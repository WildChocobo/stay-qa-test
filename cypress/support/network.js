export function interceptByCat() {
  cy.intercept('POST', '**/bycat').as('byCat');
}

export function interceptViewDetail() {
  cy.intercept('POST', '**/view').as('viewDetail');
}
