export function visit() {
  cy.visit('https://www.demoblaze.com/index.html');
}

export function selectCategory(categoryName) {
  cy.contains('.list-group-item', categoryName).click();
}

export function product(index) {
  return cy.get('.card-title a').eq(index);
}

export function productPrice(index) {
  return cy.get('.card-block h5').eq(index);
}

export function openProduct(index) {
  cy.get('.card-title a').eq(index).click();
}
